describe('OwinController', function () {
    var scope, $controllerConstructor,mockLoginService,defered;
    beforeEach(module('MyApp'));
    beforeEach(inject(function ($controller,$rootScope,LoginService,$q) {
        scope = $rootScope.$new();
        mockLoginService = LoginService;
        $qService = $q;
        deferred = $qService.defer();
        $controllerConstructor = $controller;

    }));


    //it('scope.msg should be equal to mock message hello', function () {
    //    var message = "Hello";
    //    var controller = $controllerConstructor("OwinController", { $scope: scope, LoginService: {}, $route: {}, $location: {}, $routeParams: {}, $cookieStore: {}});
    //    expect(scope.msg).toBe(message);
    //   // expect(true).toBe(true);
    //});

    //it('scope.mesg function should be equal to hello', function () {
    //    var message = "Hello";
    //    var controller = $controllerConstructor("OwinController", { $scope: scope, LoginService: {}, $route: {}, $location: {}, $routeParams: {}, $cookieStore: {} });
    //    expect(scope.mesg()).toBe(message);
    //    // expect(true).toBe(true);
    //});

    it('should call loginservice  when form is valid', function () {
        var controller = $controllerConstructor("OwinController", { $scope: scope, LoginService: mockLoginService, $route: {}, $location: {}, $routeParams: {}, $cookieStore: {} });
        var user = { Email: "abc@gmail.com", Password: "abc" };
        var form = {};
        form.$valid = true;
        spyOn(mockLoginService, 'userLogin').and.callFake(function () { return deferred.promise;});
        
       
        scope.Login(user,form);
        expect(mockLoginService.userLogin).toHaveBeenCalled();
        // expect(true).toBe(true);
    });

    it('should not call loginservice when form is invalid', function () {
        var controller = $controllerConstructor("OwinController", { $scope: scope, LoginService: mockLoginService, $route: {}, $location: {}, $routeParams: {}, $cookieStore: {} });
        var user = { Email: "abc@gmail.com", Password: "abc" };
        var form = {};
        form.$valid = false;
        spyOn(mockLoginService, 'userLogin').and.callFake(function () { return deferred.promise; });


        scope.Login(user, form);
        expect(mockLoginService.userLogin).not.toHaveBeenCalled();
        // expect(true).toBe(true);
    });


    it('should call logoutservice', function () {
        var controller = $controllerConstructor("OwinController", { $scope: scope, LoginService: mockLoginService, $route: {}, $location: {}, $routeParams: {}, $cookieStore: {} });
        
        spyOn(mockLoginService, 'userLogout').and.callFake(function () { return deferred.promise; });
        scope.Logout();
        expect(mockLoginService.userLogout).toHaveBeenCalled();
        // expect(true).toBe(true);
    });
})

