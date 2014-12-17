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

    public static ObjectNode getGameField(IGoController ctrl) {
        int fieldSize = ctrl.getGameFieldSize();

        ObjectNode result = Json.newObject();

        String[][] field = new String[fieldSize][fieldSize];

        for (int i = 0; i < fieldSize; i++) {
            for (int j = 0; j < fieldSize; j++) {
                field[i][j] = ctrl.getCellStatus(i, j) + "";
            }
        }

        Map<String, Integer> score = new HashMap<String, Integer>();
        score.put("white", ctrl.getwhitePlayerScore());
        score.put("black", ctrl.getblackPlayerScore());

        result.put("gamefield", Json.toJson(field));
        result.put("next", Json.toJson(ctrl.getNext()));
        result.put("score", Json.toJson(score));
        result.put("operate", Json.toJson(ctrl.getOperate()));

        return result;
    }
}
