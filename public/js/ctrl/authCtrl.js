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
        $rootScope.isSignedIn = false;
        $scope.renderSignIn = function() {
            AuthService.auth()
                .then(function(response) {
                    var signInOptParams = {
                        'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',
                        'callback': $scope.authCallback,
                        'redirecturi': "postmessage",
                        'clientid': response.data.client_id,
                        'requestvisibleactions': "http://schemas.google.com/AddActivity",
                        'cookiepolicy': "single_host_origin"
                    };
                    gapi.signin.render('gButton', signInOptParams);
                });
        };
        $scope.renderSignIn();

        $scope.authCallback = function(authResult) {
            if ($rootScope.isSignedIn || authResult['access_token']) {
                $rootScope.isSignedIn = true;
                AuthService.getUserInformation(authResult['access_token'])
                    .then(function(response) {
                        $rootScope.userId = response.data.user_id;
                        $rootScope.userMail = response.data.email;
                    });

            } else if (authResult['error']) {
                $rootScope.isSignedIn = false;
                console.log('Error:' + authResult['error']);
            }
        };
    });
