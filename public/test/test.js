describe("Unit: Testing Controllers", function() {
    beforeEach(module("goApp"));

    var $controller;

    beforeEach(inject(function(_$controller_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));



    it('should have an WelcomeCtrl controller', function() {
        var $scope = {};
        var controller = $controller('WelcomeCtrl', {
            $scope: $scope
        });
        expect(controller).not.toBe(null);
    });

    it('should have an GameCtrl controller', function() {
        var $scope = {};
        var controller = $controller('GameCtrl', {
            $scope: $scope
        });
        expect(controller).not.toBe(null);
    });

    it('should have an PregameCtrl controller', function() {
        var $scope = {};
        var controller = $controller('PregameCtrl', {
            $scope: $scope
        });
        expect(controller).not.toBe(null);
    });
    it('should have an WelcomeDialogCtrl controller', function() {
        var $scope = {};
        var controller = $controller('WelcomeDialogCtrl', {
            $scope: $scope
        });
        expect(controller).not.toBe(null);
    });

    it('should have an AuthCtrl controller', function() {
        var $scope = {};
        var controller = $controller('AuthCtrl', {
            $scope: $scope
        });
        expect(controller).not.toBe(null);
    });

});
