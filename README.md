[![Stories in Ready](https://badge.waffle.io/michaelknoch/de.htwg.wt.go.png?label=ready&title=Ready)](https://waffle.io/michaelknoch/de.htwg.wt.go)
#
[![Build Status](https://travis-ci.org/michaelknoch/de.htwg.wt.go.svg?branch=master)](https://travis-ci.org/michaelknoch/de.htwg.wt.go)

## Go - with WUI
This Project is a implementation of the board-game "Go", written in Java.
It exposes a RESTful http-api.

### It implements several webtechnologies

* Play Framework (Server side)
* Bootstrap
* WebSockets
* Angular.js
* Jasmine ([Frontend] Unit-Tests)
* Karma (Test-Runner)
* Polymer (some loading elements)
* Google OAuth2
* Travis CI


### RestAPI Design
| Resource | GET | POST | PUT | DELETE |
| ------------- |:-------------| :----- |:----- | :-----|
|| (read) | (create) | (update) | (delete)  |
|/setStone/| - | set stone to the given choords | - | -  |
|/createNewField/:size| - | create new gameField | - | -  |
|/getStatus/| returns Gamestatus | - | - | -  |
|/getScore/| returns the Score of both players | - | - | -  |
|/getGameField/| returns the Gamefield | - | - | -  |


