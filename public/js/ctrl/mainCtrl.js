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
        $scope.gameField = [];

        $scope.setStone = function() {
            var json = {
                x: 1,
                y: 2
            };
            var promise = GameService.getGameField();
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

        $scope.getGameField = function() {
            var promise = GameService.getGameField();
            promise.then(function(resp) {
                $scope.gameField = resp.data.gamefield;
            });
        };

        //bootstrap gamefield
        $scope.getGameField();
    });
