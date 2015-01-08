'use strict';

/**
 * @ngdoc function
 * @name invoicePocApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the invoicePocApp
 */
angular.module('goApp')
    .controller('GameCtrl', function($scope, $rootScope, $state, GameService, $interval, $mdDialog) {
        $scope.errorState = false;
        $scope.gameField = [];

        var socketUrl = 'ws://' + location.host + '/connectWebSocket';
        var connection = new WebSocket(socketUrl);
        initWebsockets();

        function initWebsockets() {
            connection.onmessage = function(msg) {
                var data = JSON.parse(msg.data);

                if (!data.operate) {
                    notAlive();
                }

                $scope.gameField = data.gamefield;
                $scope.score = data.score;
                $scope.whosNext = data.next;
                $scope.operate = data.operate;
                $scope.$apply();
            };
        }

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

            var promise = GameService.setStone({
                x: x,
                y: y
            });
            promise.error(function(resp) {
                $scope.errorState = true;
                $scope.status = resp.message;
            }).then(function(resp) {
                $scope.errorState = false;
                //$scope.setStoneState = resp;
                $scope.status = resp.data.message;

            });
        };

        $scope.getStatus = function() {
            GameService.getStatus().error(function(err) {
                console.log(err);
            }).then(function(resp) {
                $scope.status = resp.data;
                var regex = /black is next /;
                var regex2 = /black is still next/;
                if ($scope.status.match(regex) || $scope.status.match(regex2)) {
                    $scope.whosNext = 'black';
                } else {
                    $scope.whosNext = 'white';
                }
            });
        };

        $scope.getGameField = function() {
            var promise = GameService.getGameField();
            promise.then(function(resp) {
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
            GameService.getScore().error().then(function(resp) {
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

        function fetchInformation() {
            $scope.getStatus();
            $scope.getScore();
            $scope.getGameField();
            $scope.refresh();
        }

        $scope.myTurn = function() {
            if (localStorage.getItem('myColor') === $scope.whosNext) {
                return true;
            } else {
                return false;
            }
        };

        $scope.closeGame = function() {
            GameService.closeGame();
        }

        $scope.refresh = function() {
            GameService.refresh();
        }

        //bootstrap gamefield
        fetchInformation();
    });


    function DialogController($scope, $mdDialog) {
      $scope.hide = function() {
        $mdDialog.hide();
      };
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
    }
