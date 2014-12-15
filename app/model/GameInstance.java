package model;

import de.htwg.go.controller.impl.GoController;

/**
 * Created by timoweiss on 12/15/14.
 */
public class GameInstance {
    private String player1;
    private String player2;
    private GoController controller;
    public final int gameId;

    public GameInstance(String name, GoController controller) {
        this.player1 = name;
        this.player2 = "anonym";
        this.controller = controller;
        this.gameId = controller.hashCode();
    }

    public void setPlayer2(String name) {
        this.player2 = name;
    }

    public String getPlayer1() {
        return this.player1;
    }
    public String getPlayer2() {
        return this.player2;
    }


}
