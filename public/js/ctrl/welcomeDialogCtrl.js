'use strict';

/**
 * @ngdoc function
 * @name goApp.controller:WelcomeDialogCtrl
 * @description
 * # MainCtrl
 * Controller of the goApp
 */
angular.module('goApp')
    .controller('WelcomeDialogCtrl', function($scope, $state, $mdDialog, WelcomeService, $interval, $rootScope) {
        $scope.allGames = [];
        $scope.newPlayerName = '';
        $scope.newGameFieldSize = 9;
        $scope.selectedIndex = 0;
        $scope.userId = $rootScope.userId;
        $scope.newPlayerName = $rootScope.userMail;
        $scope.player1 = $rootScope.userMail;

        $scope.joinGame = function(gameId, newPlayerName) {
            WelcomeService.joinGame(gameId, newPlayerName)
                .then(function() {
                    localStorage.setItem('myColor', 'black');
                    $mdDialog.hide()
                        .then(function() {
                            $state.go('game', {
                                gameId: gameId
                            });
                        });
                });
        };

        function fetchGames() {
            if ($state.is('welcome')) {
                WelcomeService.getAllGames()
                    .then(function(res) {
                        // redirect tab if no games exist
                        if (res.data.length === 0) {
                            $scope.selectedIndex = 1;
                            return;
                        }
                        $scope.allGames = res.data;
                    });
            }
        }

        $scope.createNewGame = function(name, size) {
            WelcomeService.createNewGame(name, size).then(function(res) {
                localStorage.setItem("gameId", res.data.session);
                localStorage.setItem('myColor', 'white');
                $state.go('game', {
                    gameId: res.data.session
                });
            }).then($scope.closeDialog);
        };

        $scope.closeDialog = function() {
            $mdDialog.hide()
                .then(function() {
                    $state.go('game');
                });
        };
        fetchGames();
        //$interval(fetchGames, 1500);

    });
