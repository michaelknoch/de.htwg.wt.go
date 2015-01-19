'use strict';

/**
 * @ngdoc overview
 * @name invoicePocApp
 * @description
 * # invoicePocApp
 *
 * Main module of the application.
 */
angular.module('goApp', ['ui.router', 'ngMaterial'])
    .config(function($urlRouterProvider, $stateProvider, $compileProvider) {
        $compileProvider.debugInfoEnabled(false);
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('auth', {
                url: '/',
                templateUrl: 'assets/partials/main.html',
                controller: 'AuthCtrl'
            })
            .state('welcome', {
                url: '/welcome',
                templateUrl: 'assets/partials/main.html',
                controller: 'WelcomeCtrl'
            })
            .state('game', {
                url: '/game/:gameId',
                templateUrl: 'assets/partials/game.html',
                controller: 'GameCtrl'
            });
    });
