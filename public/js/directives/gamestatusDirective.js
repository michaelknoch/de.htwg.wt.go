angular.module('goApp').directive('gamestatus', function($rootScope) {
    return {
        restrict: 'E', // Element <scoreboard></scoreboard>
        require: '^ngModel',
        templateUrl: 'assets/partials/status.html'
    };

});
