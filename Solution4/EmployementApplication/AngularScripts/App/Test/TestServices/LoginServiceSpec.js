describe('LoginService', function () {
  
    beforeEach(module('MyApp'));
   

    it('should issue a POST request to ApiPath:/api/Account/Login ', inject(function (LoginService, $httpBackend) {
       
        var user = { email: 'abc', password: 'abcdef' };
        var mockUser = user;
        $httpBackend.when('POST', '/api/Account/Login').respond(user);
        promise = LoginService.userLogin(user);
        promise.then(function (result) {
            expect(result.email).toBe(mockUser.email);
        });
        $httpBackend.flush();
    }))

    it('should issue a POST request to the ApiPath:/api/Account/SignOut  ', inject(function (LoginService, $httpBackend) {

        var user = { email: 'abc', password: 'abcdef' };
        var mockUser = user;
        $httpBackend.when('POST', '/api/Account/SignOut').respond(user);
        promise = LoginService.userLogout(user);
        promise.then(function (result) {
            expect(result.email).toBe(mockUser.email);
        });
        $httpBackend.flush();
    }))
    
});