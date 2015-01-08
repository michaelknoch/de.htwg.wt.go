'use strict';

/**
 * @ngdoc function
 * @name goApp.controller:WelcomeDialogCtrl
 * @description
 * # MainCtrl
 * Controller of the goApp
 */
angular.module('goApp')
    .controller('WelcomeDialogCtrl', function($scope, $state, $mdDialog, WelcomeService, $interval) {
        $scope.allGames = {};
        $scope.newPlayerName = '';
        $scope.newGameFieldSize = 9;

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
                WelcomeService.getAllPlayers()
                    .then(function(res) {
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
        $interval(fetchGames, 1500);

    });