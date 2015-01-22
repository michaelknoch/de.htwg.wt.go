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

import java.math.BigInteger;
import java.security.SecureRandom;
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
        // save gameId in session
        session("gameId", gameId + "");
        gameInstance.setPlayer2(player2);
        return ok(JSONValue.toJSONString(gameInstance));
    }

    public static Result getAllGames() {

        List l1 = new LinkedList();

        for(Integer x : gameInstances.keySet()) {
            Map m1 = new LinkedHashMap();
            GameInstance gi = gameInstances.get(x);
            if (gi.getController().getOperate()) {

                m1.put("gameId", String.valueOf(x));
                m1.put("player1", Json.toJson(gi.getPlayer1()));
                m1.put("player2", Json.toJson(gi.getPlayer2()));

                if (gi.getPlayer2() == "open") {
                    m1.put("availableToJoin", true);
                } else {
                    m1.put("availableToJoin", false);
                }
                l1.add(m1);
            }
        }
        String jsonText = JSONValue.toJSONString(l1);
        return ok(jsonText);
    }

    /**
     * createNewField
     * Route for /createNewField/:size
     *
     * @param size, size of the field
     * @return
     */
    public static Result createNewField(String size) {
        GameInstance gameInstance = getGameInstance();
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
        GameInstance gameInstance = getGameInstance();

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
        GameInstance gameInstance = getGameInstance();
        gameInstance.getController().stop();
        return ok();
    }

    public static Result getStatus() {
        GameInstance gameInstance = getGameInstance();
        return ok(gameInstance.getController().getStatus());
    }


    public static Result getScore() {
        Map m1 = new LinkedHashMap();
        GameInstance gameInstance = getGameInstance();
        m1.put("white", gameInstance.getController().getwhitePlayerScore());
        m1.put("black", gameInstance.getController().getblackPlayerScore());
        return ok(JSONValue.toJSONString(m1));
    }

    public static Result getGameField() {
        GameInstance gameInstance = getGameInstance();
        IGoController ctrl = gameInstance.getController();
        return ok(staticHelpers.getGameField(ctrl));
    }

    public static Result getNext() {
        GameInstance gameInstance = getGameInstance();
        return ok(gameInstance.getController().getNext());
    }

    public static Result pass() {
        GameInstance gameInstance = getGameInstance();
        return ok(gameInstance.getController().pass() + "");
    }

    public static Result operate() {
        GameInstance gameInstance = getGameInstance();
        return ok(gameInstance.getController().getOperate() + "");
    }

    public static Result refresh() {
        getGameInstance().getController().notifyObservers();
        return ok();
    }

    private static GameInstance getGameInstance() {
        int gameId = Integer.parseInt(session("gameId"));
        return gameInstances.get(gameId);
    }

    public static WebSocket<String> connectWebSocket() {
        return new WebSocket<String>() {
            GameInstance gameInstance = getGameInstance();
            public void onReady(WebSocket.In<String> in, WebSocket.Out<String> out) {
                new GameFieldObserver(gameInstance.getController(), out);
            }

        };

    }

    public static Result joined() {
        GameInstance gameInstance = getGameInstance();
        if (gameInstance.getPlayer2() != "open") {
            return ok(true + "");
        } else {
            return ok(false + "");
        }
    }

    public static Result auth() {
        final String CLIENT_ID = "949119415800-veiff8ej76e2jectuf5hr5gt6ono43ug.apps.googleusercontent.com";
        final String APPLICATION_NAME = "htwg-go";

        // Erzeugen Sie ein Status-Token zur Verhinderung von Anfragenfälschung.
        // Speichern Sie es in der Sitzung, damit es später validiert werden kann.
        String state = new BigInteger(130, new SecureRandom()).toString(32);
        session("state", state);

        Map m1 = new LinkedHashMap();

        m1.put("client_id", CLIENT_ID);
        m1.put("state", state);
        m1.put("application_name", APPLICATION_NAME);

        return ok(JSONValue.toJSONString(m1));
    }
}
