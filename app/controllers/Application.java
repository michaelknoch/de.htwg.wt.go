package controllers;

import de.htwg.go.Go;
import de.htwg.go.controller.IGoController;
import de.htwg.go.controller.impl.GoController;
import model.GameInstance;
import play.libs.Json;
import com.fasterxml.jackson.databind.JsonNode;
import play.mvc.Controller;
import play.mvc.Result;
import model.GameFieldObserver;
import play.mvc.WebSocket;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;

import java.util.*;


public class Application extends Controller {
    static Map<Integer, GameInstance> gameInstances = new HashMap<Integer, GameInstance>();

    public static Result index() {
        session("connected", "");
        return ok(views.html.index.render());
    }

    public static Result createNewGame(String player1, int gameSize) {
        Map result = new LinkedHashMap();
        IGoController game = new GoController();
        GameInstance gameInstance = new GameInstance(player1, game);
        game.createField(gameSize);
        session("gameId", gameInstance.gameId + "");
        // add new instance to ArrayList
        gameInstances.put(gameInstance.gameId, gameInstance);
        result.put("session", gameInstance.gameId + "");
        return ok(JSONValue.toJSONString(result));
    }

    public static Result joinGame(int gameId, String player2) {
        GameInstance gameInstance = gameInstances.get(gameId);
        session("gameId", gameId + "");
        gameInstance.setPlayer2(player2);
        return ok(JSONValue.toJSONString(gameInstance));
    }

    public static Result getAllPlayers() {

        List l1 = new LinkedList();

        for(Integer x : gameInstances.keySet()) {
            Map m1 = new LinkedHashMap();

            if (gameInstances.get(x).getController().getOperate()) {
                m1.put("gameId", String.valueOf(x));
                m1.put("player1", Json.toJson(gameInstances.get(x).getPlayer1()));
                m1.put("player2", Json.toJson(gameInstances.get(x).getPlayer2()));
                l1.add(m1);
            }

        }
        String jsonText = JSONValue.toJSONString(l1);
        return ok(jsonText);
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
        IGoController ctrl = gameInstance.getController();
        ctrl.createField(Integer.parseInt(size));
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

        Map result = new LinkedHashMap();
        if (json == null) {
            return badRequest("Expecting Json data");
        } else {
            String propX = json.findValue("x").toString();
            String propY = json.findValue("y").toString();
            int intY = Integer.parseInt(propY);
            int intX = Integer.parseInt(propX);
            IGoController ctrl = gameInstance.getController();
            boolean status = ctrl.setStone(intX, intY);

            if (!status) {
                result.put("status", "ERROR");
                result.put("statusCode", 400);
                result.put("message", ctrl.getStatus());
                return badRequest(JSONValue.toJSONString(result));
            } else {
                result.put("status", "OK");
                result.put("statusCode", 200);
                result.put("message", ctrl.getStatus());
                return ok(JSONValue.toJSONString(result));
            }
        }
    }

    public static Result closeGame() {
        int gameId = Integer.parseInt(session("gameId"));
        gameInstances.get(gameId).getController().stop();
        return ok();
    }

    public static Result getStatus() {
        int gameId = Integer.parseInt(session("gameId"));
        GameInstance gameInstance = gameInstances.get(gameId);
        return ok(gameInstance.getController().getStatus());
    }


    public static Result getScore() {
        Map m1 = new LinkedHashMap();
        int gameId = Integer.parseInt(session("gameId"));
        GameInstance gameInstance = gameInstances.get(gameId);
        m1.put("white", gameInstance.getController().getwhitePlayerScore());
        m1.put("black", gameInstance.getController().getblackPlayerScore());
        return ok(JSONValue.toJSONString(m1));
    }

    public static Result getGameField() {
        int gameId = Integer.parseInt(session("gameId"));
        GameInstance gameInstance = gameInstances.get(gameId);
        IGoController ctrl = gameInstance.getController();
        return ok(staticHelpers.getGameField(ctrl));
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

    public static Result refresh() {
        int gameId = Integer.parseInt(session("gameId"));
        gameInstances.get(gameId).getController().notifyObservers();
        return ok();
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
