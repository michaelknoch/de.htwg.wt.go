package controllers;

import de.htwg.go.Go;
import de.htwg.go.controller.IGoController;
import de.htwg.go.controller.impl.GoController;
import model.GameInstance;
import play.libs.Json;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import play.mvc.Controller;
import play.mvc.Result;
import model.GameFieldObserver;
import play.mvc.WebSocket;
import org.json.simple.JSONObject;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;


public class Application extends Controller {
    static Map<Integer, GameInstance> gameInstances = new HashMap<Integer, GameInstance>();

    public static Result index() {
        System.out.println("new client");
        System.out.println(session("newuser"));
        System.out.println(session("gameId"));
        session("connected", "");
        //clientList.add(session("connected"));
        return ok(views.html.index.render());
    }

    public static Result createNewGame(String player1) {
        ObjectNode result = Json.newObject();
        IGoController game = new GoController();
        GameInstance gameInstance = new GameInstance(player1, game);

        session("gameId", gameInstance.gameId + "");
        // add new instance to ArrayList
        gameInstances.put(gameInstance.gameId, gameInstance);
        result.put("status", "success");
        return ok(result);
    }

    public static Result joinGame(int gameId, String player2) {
        GameInstance gameInstance = gameInstances.get(gameId);
        session("gameId", gameId + "");
        gameInstance.setPlayer2(player2);
        return ok(Json.toJson(gameInstance));
    }

    public static Result getAllPlayers() {
        JSONObject result = new JSONObject();
        for(Integer x : gameInstances.keySet()) {

            /*result.putArray(String.valueOf(x));
            result.get(String.valueOf(x));
            result.put("gameId" , String.valueOf(x));
            result.put("player1" , Json.toJson(gameInstances.get(x).getPlayer1()));
            result.put("player2" , Json.toJson(gameInstances.get(x).getPlayer2()));*/
        }
        //result.put("players", new JSONObject(gameInstances));
        return ok(result.toString());
    }

    /**
     * TODO: remove
     *
     * @return
     */
    public static Result test() {
        System.out.println(gameInstances.size());
        return ok("ok");
    }

    /**
     * createNewField
     * Route for /createNewField/:size
     *
     * @param size, size of the field
     * @return
     */
    public static Result createNewField(String size) {
        int gameId = Integer.parseInt(session("gameId"));
        GameInstance gameInstance = gameInstances.get(gameId);

        gameInstance.getController().createField(Integer.parseInt(size));
        return ok("new Field created " + size + " x " + size);
    }

    /**
     * setStone
     * Route for /setStone
     *
     * @return
     */
    public static Result setStone() {
        JsonNode json = request().body().asJson();
        int gameId = Integer.parseInt(session("gameId"));
        GameInstance gameInstance = gameInstances.get(gameId);

        ObjectNode result = Json.newObject();
        if (json == null) {
            return badRequest("Expecting Json data");
        } else {
            String propX = json.findValue("x").toString();
            String propY = json.findValue("y").toString();
            int intY = Integer.parseInt(propY);
            int intX = Integer.parseInt(propX);
            boolean status = gameInstance.getController().setStone(intX, intY);
            if (!status) {
                result.put("status", "ERROR");
                result.put("statusCode", 400);
                result.put("message", gameInstance.getController().getStatus());
                return badRequest(result);
            } else {
                result.put("status", "OK");
                result.put("statusCode", 200);
                result.put("message", gameInstance.getController().getStatus());
                return ok(result);
            }
        }
    }

    public static Result getStatus() {
        int gameId = Integer.parseInt(session("gameId"));
        GameInstance gameInstance = gameInstances.get(gameId);
        return ok(gameInstance.getController().getStatus());
    }


    public static Result getScore() {
        ObjectNode result = Json.newObject();
        int gameId = Integer.parseInt(session("gameId"));
        GameInstance gameInstance = gameInstances.get(gameId);
        result.put("white", gameInstance.getController().getwhitePlayerScore());
        result.put("black", gameInstance.getController().getblackPlayerScore());
        return ok(result);
    }

    public static Result getGameField() {
        return ok(staticHelpers.getGameField());
    }

    public static Result getNext() {
        int gameId = Integer.parseInt(session("gameId"));
        GameInstance gameInstance = gameInstances.get(gameId);
        return ok(gameInstance.getController().getNext());
    }

    public static Result pass() {
        int gameId = Integer.parseInt(session("gameId"));
        GameInstance gameInstance = gameInstances.get(gameId);
        return ok(gameInstance.getController().pass() + "");
    }

    public static Result operate() {
        int gameId = Integer.parseInt(session("gameId"));
        GameInstance gameInstance = gameInstances.get(gameId);
        return ok(gameInstance.getController().getOperate() + "");
    }

    public static WebSocket<String> connectWebSocket() {
        return new WebSocket<String>() {
            int gameId = Integer.parseInt(session("gameId"));
            GameInstance gameInstance = gameInstances.get(gameId);
            public void onReady(WebSocket.In<String> in, WebSocket.Out<String> out) {
                new GameFieldObserver(gameInstance.getController(), out);
            }

        };

    }

}
