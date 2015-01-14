'use strict';

/**
 * @ngdoc function
 * @name invoicePocApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the invoicePocApp
 */
angular.module('goApp')
    .controller('GameCtrl', function($scope, $rootScope, $state, GameService, WebsocketService, $interval, $mdDialog) {
        $scope.errorState = false;
        $scope.gameField = [];
        var _myColor = '';

        function notAlive() {
            $scope.showConfirm = function(ev) {
                var confirm = $mdDialog.confirm()
                    .title('Game')
                    .content('The game has been closed! White Score: ' + $scope.score.white + ' Black Score: ' + $scope.score.black)
                    .ok('Got it!')
                    .targetEvent(ev);
                $mdDialog.show(confirm).then(function() {
                    $state.go('welcome');
                });
            };
            $scope.showConfirm();
        }

        $scope.setStone = function(x, y) {
            if (!$scope.myTurn()) {
                $scope.errorState = true;
                $scope.status = "It's not your turn, wait for opponent";
                return;
            }
            var position = {
                x: x,
                y: y
            };

            GameService.setStone(position)
                .error(function(resp) {
                    $scope.errorState = true;
                    $scope.status = resp.message;
                })
                .then(function(resp) {
                    $scope.errorState = false;
                    //$scope.setStoneState = resp;
                    $scope.status = resp.data.message;
                });
        };

        $scope.getStatus = function() {
            GameService.getStatus()
                .error(function(err) {
                    // swap to lobby
                    $state.go('welcome');
                }).then(function(resp) {
                    $scope.status = resp.data;

                });
        };

        $scope.getGameField = function() {
            GameService.getGameField()
                .then(function(resp) {
                    $scope.gameField = resp.data.gamefield;
                    $scope.gameFieldIndex = $scope.gameField.length - 1;
                });
        };

        $scope.createNewField = function(size) {
            GameService.createNewField(size)
                .error(function() {
                    $scope.errorState = true;
                    $scope.createNewField = 'äääää';
                }).then(function(resp) {
                    $scope.errorState = false;
                    $scope.getGameField();
                    fetchInformation();
                });
        };

        $scope.getScore = function() {
            GameService.getScore()
                .error()
                .then(function(resp) {
                    $scope.score = resp.data;
                });
        };

        $scope.pass = function() {
            if (!$scope.myTurn()) {
                $scope.errorState = true;
                $scope.status = "It's not your turn, wait for opponent";
                return;
            }

            GameService.pass();
            $scope.getStatus();
        };

        $scope.getNext = function() {
            GameService.getNext().then(function(resp) {
                $scope.whosNext = resp.data;
            });
        };

        function fetchInformation() {
            $scope.getStatus();
            $scope.getScore();
            $scope.getGameField();
            $scope.getNext();
        }

        $scope.myTurn = function() {
            if (!_myColor) {
                _myColor = localStorage.getItem('myColor');
            }
            if (_myColor === $scope.whosNext) {
                return true;
            } else {
                return false;
            }
        };

        $scope.closeGame = function() {
            GameService.closeGame();
        };

        function onMessage(msg) {
            var data = JSON.parse(msg.data);
            if (!data.operate) {
                notAlive();
            }
            $scope.gameField = data.gamefield;
            $scope.score = data.score;
            $scope.whosNext = data.next;
            $scope.operate = data.operate;
            $scope.status = data.status
            $scope.$apply();

        }

        $scope.refresh = function() {
            GameService.refresh();
        };

        // Set up websocket connection
        WebsocketService.connect(onMessage);

        //bootstrap gamefield
        fetchInformation();
    });
