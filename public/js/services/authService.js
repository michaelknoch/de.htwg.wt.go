'use strict';

angular.module('goApp')

.service('AuthService', function($http) {
    return {
        auth: function() {
            return $http.get('/auth');
        },

        getUserInformation: function(access_token) {
            return $http.get('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' + access_token);
        }
    };
});
