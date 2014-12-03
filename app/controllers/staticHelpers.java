package controllers;

import com.fasterxml.jackson.databind.node.ObjectNode;
import de.htwg.go.Go;
import de.htwg.go.controller.IGoController;
import play.libs.Json;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by michaelknoch on 26.11.14.
 */
public class staticHelpers {

    static IGoController controller = Go.getInstance().getController();
    public static ObjectNode getGameField() {
        int fieldSize = controller.getGameFieldSize();

        ObjectNode result = Json.newObject();

        String[][] field = new String[fieldSize][fieldSize];

        for (int i = 0; i < fieldSize; i++) {
            for (int j = 0; j < fieldSize; j++) {
                field[i][j] = controller.getCellStatus(i, j) + "";
            }
        }

        Map<String, Integer> score = new HashMap<String, Integer>();
        score.put("white", controller.getwhitePlayerScore());
        score.put("black", controller.getblackPlayerScore());

        result.put("gamefield", Json.toJson(field));
        result.put("next", Json.toJson(controller.getNext()));
        result.put("score", Json.toJson(score));
        result.put("operate", Json.toJson(controller.getOperate()));

        return result;
    }
}
