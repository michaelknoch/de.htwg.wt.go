angular.module('goApp').directive('scale', function() {
    return function(scope, element, attrs) {
        $(window).resize(function() {
            scale();
        });

        function scale() {
            var wrapperWidth = $('.field-wrapper').width() - 30;
            var value = (wrapperWidth / scope.gameField.length);
            angular.element(element).css('width', value + 'px');
            angular.element(element).css('height', value + 'px');
        }
        scale();
    };

});
