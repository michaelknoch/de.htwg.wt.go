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

        $scope.userName = $scope.userName || 'Bobby';
        // Dialog #1 - Show simple alert dialog and cache
        // reference to dialog instance

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
    .controller('WelcomeDialogCtrl', function($scope, $state, $mdDialog) {
        $scope.closeDialog = function() {
            $mdDialog.hide(function() {
                debugger;
            });
            $state.go('game');
        };
    });
