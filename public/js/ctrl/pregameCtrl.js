'use strict';

/**
 * @ngdoc function
 * @name goApp.controller:WelcomeCtrl
 * @description
 * # MainCtrl
 * Controller of the goApp
 */
angular.module('goApp')
    .controller('PregameCtrl', function($scope, $rootScope, $state, $stateParams, WelcomeService, $interval, $mdDialog) {

        var intervalPromise = null;

        var polling = function() {
            WelcomeService.joined().then(function(deepres) {
                if (deepres.data == 'true') {
                    $state.go('game', {
                        gameId: $stateParams.gameId
                    });
                    $mdDialog.hide()
                        .then(function() {
                            $interval.cancel(intervalPromise);
                        });

                }
            });
        };

        var startPolling = function() {
            intervalPromise = $interval(polling, 1000);
        };


        function showPregameDialog($event) {
            $mdDialog.show({
                targetEvent: $event,
                templateUrl: 'assets/partials/pregame.html',
                onComplete: afterShowAnimation,
                clickOutsideToClose: false
            });
            // When the 'enter' animation finishes...
            function afterShowAnimation(scope, element, options) {
                // post-show code here: DOM element focus, etc.
            }
        }

        $mdDialog.hide().then(showPregameDialog).then(startPolling);

    });