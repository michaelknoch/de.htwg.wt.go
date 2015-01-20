describe("Unit: Testing Controllers", function() {
    beforeEach(module("goApp"));

    var $controller;

    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
    }));

    it('should have an AuthCtrl controller', function() {
        var $scope = {};
        var controller = $controller('AuthCtrl', {
            $scope: $scope
        });
        expect(controller).not.toBe(null);
    });


});
