angular.module('goApp').directive('loading', function($timeout) {
    return function(scope, element, attrs) {

        $timeout(function(){
           $('.game-wrapper').addClass('show');
           $('.spin-wrapper').addClass('hide');
        }, 1600);
    };

});
