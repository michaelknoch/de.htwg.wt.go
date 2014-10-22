'use strict';

angular.module('goApp')

.service('GameService', function($http, $q) {

    return {
        setStone: function(formData) {
            return $http.post('/setStone', formData);
        }
    };
});
