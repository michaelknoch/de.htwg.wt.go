package controllers;

import play.mvc.Controller;
import play.mvc.Result;
import de.htwg.go.Go;
import de.htwg.go.controller.IGoController;

public class Application extends Controller {
    static IGoController controller = Go.getInstance().getController();

    public static Result index() {

        return ok(views.html.index.render(controller.getStatus()));
    }

    public static Result test() {

        return ok(controller.tuiToString());
    }

    public static Result setStone(String x, String y) {
        int paramX = Integer.parseInt(x);
        int paramY = Integer.parseInt(y);
        if(controller.setStone(paramX, paramY)) {
            return ok(controller.getStatus());
        } else {
            return ok(controller.getStatus());
        }

    }

}
