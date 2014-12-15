'use strict';

angular.module('goApp')

.service('WelcomeService', function($http) {
    return {
        getAllPlayers: function() {
            return $http.get('/getAllPlayers');
        }
    };
});
