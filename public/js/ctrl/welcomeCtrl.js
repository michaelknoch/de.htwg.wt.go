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
    .controller('WelcomeDialogCtrl', function($scope, $state, $mdDialog, WelcomeService) {
        $scope.allGames = {};
        $scope.newPlayerName = '';
        $scope.newGameFieldSize = 9;

        $scope.joinGame = function(gameId, newPlayerName) {
            console.log(newPlayerName)
            WelcomeService.joinGame(gameId, newPlayerName).then($scope.closeDialog);
        };

        function fetchGames() {
            WelcomeService.getAllPlayers().then(function(res) {
                $scope.allGames = res.data;
            });
        }

        $scope.createNewGame = function() {
            WelcomeService.getAllPlayers($scope.newPlayerName, $scope.newGameFieldSize).then(function(res) {
                debugger;
                localStorage.setItem("gameId", res.data.session);
                $state.go('game');
            }).then($scope.closeDialog);
        };

        $scope.closeDialog = function() {
            $mdDialog.hide().then(function() {
                $state.go('game');
            });
        };
        fetchGames();
    });
