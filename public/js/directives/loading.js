angular.module('goApp').directive('loading', function($timeout) {
    return {
        restrict: 'E', // Element <loading></loading>
        scope: {},
        templateUrl: 'assets/partials/loading.html',
        link: function($scope, element, attrs) {
            setTimeout(function() {
                $('.game-wrapper').addClass('show');
                $('.spin-wrapper').addClass('hide');
            }, 1600);
        }
    };
});
