'use strict';

angular.module('goApp')

.service('GameService', function($http) {
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
        },
        createNewField: function(size) {
            if (!size) {
                throw new TypeError('invalid params', 'missing size');
            }
            return $http.post('/createNewField/' + size);
        },
        pass: function() {
            return $http.post('/pass');
        },
        closeGame: function() {
            return $http.post('/closeGame');
        }
    };
});
