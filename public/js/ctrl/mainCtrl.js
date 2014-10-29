'use strict';

/**
 * @ngdoc function
 * @name invoicePocApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the invoicePocApp
 */
angular.module('goApp')
    .controller('MainCtrl', function($scope, $rootScope, $state, GameService, $interval) {
        $scope.errorState = false;
        $scope.gameField = [];

        $scope.setStone = function(x, y) {
            var promise = GameService.setStone({
                x: x,
                y: y
            });
            promise.error(function(resp) {
                $scope.errorState = true;
                $scope.setStoneState = resp;
            }).then(function(resp) {
                $scope.errorState = false;
                $scope.setStoneState = resp;
                $scope.getGameField();
                fetchInformation();
            });
        };

        $scope.getStatus = function() {
            GameService.getStatus().error().then(function(resp) {
                $scope.status = resp.data;
            });
        };

        $scope.getGameField = function() {
            var promise = GameService.getGameField();
            promise.then(function(resp) {
                $scope.gameField = resp.data.gamefield;
            });
        };

        $scope.createNewField = function(size) {
            GameService.createNewField(size)
                .error(function() {
                    $scope.errorState = true;
                    $scope.createNewField = 'äääää';
                }).then(function(resp) {
                    $scope.errorState = false;
                    $scope.getGameField();
                });
        };

        $scope.getScore = function() {
            GameService.getScore().error().then(function(resp) {
                $scope.score = resp.data;
            });
        };

        function fetchInformation() {
            $scope.getScore();
            $scope.getGameField();
            $scope.getStatus();
        }

        //bootstrap gamefield
        $scope.getGameField();
        $scope.getStatus();
        $interval(fetchInformation, 10000);
    });
