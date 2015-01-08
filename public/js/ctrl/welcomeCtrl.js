'use strict';

/**
 * @ngdoc function
 * @name goApp.controller:WelcomeCtrl
 * @description
 * # MainCtrl
 * Controller of the goApp
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
