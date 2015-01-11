'use strict';

/**
 * @ngdoc function
 * @name goApp.controller:WelcomeCtrl
 * @description
 * # MainCtrl
 * Controller of the goApp
 */
angular.module('goApp')
    .controller('AuthCtrl', function($scope, $rootScope, $state, AuthService) {

        $scope.renderSignIn = function() {
            AuthService.auth()
                .then(function(response) {
                    gapi.signin.render(
                        'signinButton', {
                            'callback': $scope.authCallback,
                            'clientid': response.client_id,
                            'redirecturi': 'postmessage',
                            'accesstype': "offline",
                            /*'requestvisibleactions': "http://schemas.google.com/AddActivity",*/
                            'scope': 'https://www.googleapis.com/auth/plus.login',
                            'cookiepolicy': "single_host_origin"
                        });

                });
        };

        $scope.authCallback = function(authResult) {
            debugger;
        };
    });
