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
        $scope.errorState = false;
        $scope.setStone = function() {
            var json = {
                x: 1,
                y: 2
            };
            var promise = GameService.setStone(JSON.stringify(json));
            promise.error(function(resp) {
                $scope.errorState = true;
                $scope.setStoneState = resp;
            }).then(function(resp) {
                $scope.errorState = false;
                $scope.setStoneState = resp;
            });
        };
        $rootScope.headerTitle = 'Übersicht';
        $scope.test = 'asdasdasdTest';
    });
