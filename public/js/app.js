'use strict';

/**
 * @ngdoc overview
 * @name goApp
 * @description
 * # goApp
 *
 * Main module of the application.
 */
angular.module('goApp', ['ui.router', 'ngMaterial'])
    .config(function($urlRouterProvider, $stateProvider, $compileProvider) {
        $compileProvider.debugInfoEnabled(false);
        $urlRouterProvider.otherwise('/auth');
        $stateProvider
            .state('auth', {
                url: '/auth',
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
            })
            .state('pregame', {
                url: '/pregame/:gameId',
                tenplateUrl: 'assets/partials/pregame.html',
                controller: 'PregameCtrl'
            });
    });
