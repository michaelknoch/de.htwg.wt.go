'use strict';

angular.module('goApp')

.service('AuthService', function($http) {
    return {
        auth: function() {
            return $http.get('/auth');
        }
    };
});
