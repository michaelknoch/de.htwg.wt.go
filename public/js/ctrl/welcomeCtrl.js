'use strict';

/**
 * @ngdoc function
 * @name invoicePocApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the invoicePocApp
 */
angular.module('goApp')
    .controller('WelcomeCtrl', function($scope, $rootScope, $state, $mdDialog) {
        var alert;
        showWelcomeDialog();

        $scope.closeDialog = function() {
            $mdDialog.hide(alert, "finished");
            alert = undefined;
        };
        // Dialog #2 - Demonstrate more complex dialogs construction and popup.
        function showWelcomeDialog($event) {
            $mdDialog.show({
                targetEvent: $event,
                templateUrl: 'assets/partials/welcomeDialog.html',
                onComplete: afterShowAnimation,
                controller: 'WelcomeDialogCtrl',
                clickOutsideToClose: false,
                locals: {
                    employee: $scope.userName
                }
            });
            // When the 'enter' animation finishes...
            function afterShowAnimation(scope, element, options) {
                // post-show code here: DOM element focus, etc.
            }
        }
    });

angular.module('goApp')
    .controller('WelcomeDialogCtrl', function($scope, $state, $mdDialog, WelcomeService, $interval) {
        $scope.allGames = {};
        $scope.newPlayerName = '';
        $scope.newGameFieldSize;

        $scope.joinGame = function(gameId, newPlayerName) {
            WelcomeService.joinGame(gameId, newPlayerName).then(function() {
                localStorage.setItem('myColor', 'black');
                $mdDialog.hide().then(function() {
                    $state.go('game', {
                        gameId: gameId
                    });
                });

            });
        };

        function fetchGames() {
            if ($state.is('welcome')) {
                WelcomeService.getAllPlayers().then(function(res) {
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
            $mdDialog.hide().then(function() {
                $state.go('game');
            });
        };
        fetchGames();
        $interval(fetchGames, 1500);

    });
