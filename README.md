[![Stories in Ready](https://badge.waffle.io/michaelknoch/de.htwg.wt.go.png?label=ready&title=Ready)](https://waffle.io/michaelknoch/de.htwg.wt.go)
# 
This Project is a work-in-progress. Go away! ;)

## Go - with WUI
This Project is a implementation of the board-game "Go", written in Java.
It exposes a RESTful http-api.

### RestAPI Design
| Resource | GET | POST | PUT | DELETE |
| ------------- |:-------------| :----- |:----- | :-----|
|| (read) | (create) | (update) | (delete)  |
|/setStone/| - | set stone to the given choords | - | -  |
|/createNewField/:size| - | create new gameField | - | -  |
|/getStatus/| returns Gamestatus | - | - | -  |
|/getScore/| returns the Score of both players | - | - | -  |
|/getGameField/| returns the Gamefield | - | - | -  |

