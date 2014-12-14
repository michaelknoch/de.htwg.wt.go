'use strict';

/**
 * @ngdoc function
 * @name invoicePocApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the invoicePocApp
 */
angular.module('goApp')
    .controller('GameCtrl', function($scope, $rootScope, $state, GameService, $interval) {
        $scope.errorState = false;
        $scope.gameField = [];
        var connection = new WebSocket('ws://localhost:9000/connectWebSocket');

        connection.onmessage = function(msg) {
            var data = JSON.parse(msg.data);
            $scope.gameField = data.gamefield;
            $scope.score = data.score;
            $scope.whosNext = data.next;
            $scope.operate = data.operate;
            $scope.$apply();
        };

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
            });
        };

        $scope.getStatus = function() {
            GameService.getStatus().error(function(err) {
                alert(err);
            }).then(function(resp) {
                $scope.status = resp.data;
                var regex = /black is next/;
                var regex2 = /black is still next/;
                if ($scope.status.match(regex) || $scope.status.match(regex2)) {
                    $scope.whosNext = 'black';
                } else {
                    $scope.whosNext = 'white';
                }
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
                    fetchInformation();
                });
        };

        $scope.getScore = function() {
            GameService.getScore().error().then(function(resp) {
                $scope.score = resp.data;
            });
        };

        $scope.pass = function() {
            GameService.pass();
        };

        function fetchInformation() {
            $scope.getScore();
            $scope.getGameField();
            $scope.getStatus();
        }

        //bootstrap gamefield
        $scope.getGameField();
        fetchInformation();
        //$interval(fetchInformation, 10000);
    });
