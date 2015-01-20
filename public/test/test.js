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


    // it('should have a properly working VideosCtrl controller', inject(function($rootScope, $controller, $httpBackend) {
    //     var searchTestAtr = 'cars';
    //     var response = $httpBackend.expectJSONP(
    //         'https://gdata.youtube.com/feeds/api/videos?q=' + searchTestAtr + '&v=2&alt=json&callback=JSON_CALLBACK');
    //     response.respond(null);

    //     var $scope = $rootScope.$new();
    //     var ctrl = $controller('VideosCtrl', {
    //         $scope: $scope,
    //         $routeParams: {
    //             q: searchTestAtr
    //         }
    //     });
    // }));

    // it('should have a properly working VideoCtrl controller', inject(function($rootScope, $controller, $httpBackend) {
    //     var searchID = 'cars';
    //     var response = $httpBackend.expectJSONP(
    //         'https://gdata.youtube.com/feeds/api/videos/' + searchID + '?v=2&alt=json&callback=JSON_CALLBACK');
    //     response.respond(null);

    //     var $scope = $rootScope.$new();
    //     var ctrl = $controller('VideoCtrl', {
    //         $scope: $scope,
    //         $routeParams: {
    //             id: searchID
    //         }
    //     });
    // }));

    // it('should have a properly working WatchedVideosCtrl controller', inject(function($rootScope, $controller, $httpBackend) {
    //     var $scope = $rootScope.$new();

    //     //we're stubbing the onReady event
    //     $scope.onReady = function() {};
    //     var ctrl = $controller('WatchedVideosCtrl', {
    //         $scope: $scope
    //     });
    // }));

});
