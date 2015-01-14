angular.module('goApp').directive('gamefield', function($rootScope) {
    return {
        restrict: 'E', // Element <gamefield></gamefield>
        require: '^ngModel',
        templateUrl: 'assets/partials/gamefield.html'
    };

});
