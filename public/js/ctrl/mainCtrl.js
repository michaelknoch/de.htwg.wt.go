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
        $rootScope.headerTitle = 'Übersicht';
        $scope.test = 'asdasdasdTest';
    });
