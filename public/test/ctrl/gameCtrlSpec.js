describe("Unit: Testing Controllers", function() {
    beforeEach(module("goApp"));

    var $controller,
        $httpBackend;

    beforeEach(inject(function(_$controller_, _$httpBackend_) {
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
    }));

    it('should have an GameCtrl controller', function() {
        var $scope = {};
        var controller = $controller('GameCtrl', {
            $scope: $scope
        });
        expect(controller).not.toBe(null);
    });

    it('should set the errorState variable to false', function() {
        var $scope = {};
        var controller = $controller('GameCtrl', {
            $scope: $scope
        });
        $scope.getStatus();
        expect($scope.errorState).toBe(false);
    });

    it('should set the errorState variable to true', function() {
        var $scope = {};
        var controller = $controller('GameCtrl', {
            $scope: $scope
        });
        $scope.setStone(1, 2);
        expect($scope.errorState).toBe(true);
    });

});
