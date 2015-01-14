angular.module('goApp').directive('scoreboard', function($rootScope) {
    return {
        restrict: 'E', // Element <scoreboard></scoreboard>
        require: '^ngModel',
        templateUrl: 'assets/partials/scoreboard.html'
    };

});
