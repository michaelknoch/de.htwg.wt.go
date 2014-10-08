package controllers;

import play.mvc.Controller;
import play.mvc.Result;
import de.htwg.go.Go;
import de.htwg.go.controller.IGoController;

public class Application extends Controller {

    public static Result index() {
        return ok(views.html.index.render("Hello Play Framework"));
    }
    
}
