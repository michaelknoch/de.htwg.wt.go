package controllers;

import de.htwg.go.Go;
import de.htwg.go.controller.IGoController;
import play.libs.Json;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import play.mvc.Controller;
import play.mvc.Result;

public class Application extends Controller {
    static IGoController controller = Go.getInstance().getController();

    public static Result index() {

        return ok(views.html.index.render(controller.getStatus()));
    }

    public static Result test() {

        return ok(controller.tuiToString());
    }

    public static Result setStone() {
        JsonNode json = request().body().asJson();
        ObjectNode result = Json.newObject();
        if(json == null) {
            return badRequest("Expecting Json data");
        } else {
            String propX = json.findValue("x").toString();
            String propY = json.findValue("y").toString();
            int intY = Integer.parseInt(propY);
            int intX = Integer.parseInt(propX);
            boolean status = controller.setStone(intX, intY);
            if(!status) {
                result.put("status", "ERROR");
                result.put("statusCode", 400);
                result.put("message", controller.getStatus());
                return badRequest(result);
            } else {
                result.put("status", "OK");
                result.put("statusCode", 200);
                result.put("message", controller.getStatus());
                return ok(result);
            }
        }
    }

}
