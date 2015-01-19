'use strict';

angular.module('goApp')

.service('WelcomeService', function($http) {
    return {
        getAllGames: function() {
            return $http.get('/getAllGames');
        },
        joinGame: function(gameId, name) {
            return $http.get('/joinGame/' + gameId + '/' + name);
        },
        createNewGame: function(name, size) {
            return $http.get('/createNewGame/' + name + '/' + size);
        },
        joined: function() {
            return $http.get('/joined');
        }
    };
});
