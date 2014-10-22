'use strict';

/**
 * @ngdoc function
 * @name invoicePocApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the invoicePocApp
 */
angular.module('goApp')
    .controller('MainCtrl', function($scope, $rootScope, $state) {
        console.log('asds');
        $rootScope.headerTitle = 'Übersicht';
        $scope.test = 'asdasdasdTest';
    });
