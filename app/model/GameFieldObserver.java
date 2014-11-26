package model;

import controllers.staticHelpers;
import play.mvc.WebSocket;
import play.mvc.WebSocket.Out;
import de.htwg.go.controller.IGoController;
import de.htwg.go.util.observer.Event;
import de.htwg.go.util.observer.IObserver;

public class GameFieldObserver implements IObserver {

    private Out<String> out;
    private IGoController controller;


    public GameFieldObserver(IGoController controller,WebSocket.Out<String> out) {
        controller.addObserver(this);
        this.controller = controller;
        this.out = out;
    }

    @Override
    public void update(Event arg0) {
        out.write(staticHelpers.getGameField().toString());
        System.out.println("WUI was updated");
    }

}