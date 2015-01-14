angular.module('goApp').directive('loading', function($timeout) {
    // return function(scope, element, attrs) {

    //     $timeout(function() {
    //         $('.game-wrapper').addClass('show');
    //         $('.spin-wrapper').addClass('hide');
    //     }, 1600);
    // };

    return {
        restrict: 'E', // Element <scoreboard></scoreboard>
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
