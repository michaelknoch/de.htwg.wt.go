
angular.module('goApp').directive('scale', function() {
  return function(scope, element, attrs) {
    var wrapperWidth = $('.field-wrapper').width() - 30;
    var value = (wrapperWidth / 9);
    angular.element(element).css('width', value + 'px');
    angular.element(element).css('height', value + 'px');
  };
})