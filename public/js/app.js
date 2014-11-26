'use strict';

/**
 * @ngdoc overview
 * @name invoicePocApp
 * @description
 * # invoicePocApp
 *
 * Main module of the application.
 */
angular.module('goApp', ['ui.router'])
    .config(function($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'assets/partials/main.html',
                controller: 'MainCtrl'
            });

    });
