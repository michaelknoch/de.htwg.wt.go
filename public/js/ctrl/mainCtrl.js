'use strict';

/**
 * @ngdoc function
 * @name invoicePocApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the invoicePocApp
 */
angular.module('goApp')
    .controller('MainCtrl', function($scope, $rootScope, $state, GameService) {
        console.log(GameService);
        $scope.setStone = function() {
            var json = {
                x: 1,
                y: 2
            };
            console.log(GameService.setStone(JSON.stringify(json)));
        };
        $rootScope.headerTitle = 'Übersicht';
        $scope.test = 'asdasdasdTest';
    });
