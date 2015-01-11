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
                        'gButton', {
                            'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',
                            'callback': $scope.authCallback,
                            'clientid': response.data.client_id,
                            'requestvisibleactions': "http://schemas.google.com/AddActivity",
                            'cookiepolicy': "single_host_origin"
                        });

                });
        };
        $scope.renderSignIn();

        $scope.authCallback = function(authResult) {
            console.log(authResult);
        };
    });
