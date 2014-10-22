'use strict';

angular.module('goApp')

.service('GameService', function($http, $q) {

    return {
        getStatus: function() {
            return $http.get('/getStatus');
        },
        setStone: function(formData) {
            return $http.post('/setStone', formData);
        }
    };
});
