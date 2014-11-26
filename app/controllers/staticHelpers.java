package controllers;

import com.fasterxml.jackson.databind.node.ObjectNode;
import de.htwg.go.Go;
import de.htwg.go.controller.IGoController;
import play.libs.Json;

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

        result.put("gamefield", Json.toJson(field));

        return result;
    }
}
