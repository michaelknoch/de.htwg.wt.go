'use strict';

angular.module('goApp')

.service('GameService', function($http, $q) {

    return {
        getStatus: function() {
            return $http.get('/getStatus');
        },
        getScore: function() {
            return $http.get('/getScore');
        },
        getGameField: function() {
            return $http.get('/getGameField');
        },
        setStone: function(formData) {
            return $http.post('/setStone', formData);
        }
    };
});
