describe('EmployeeController', function () {
    var scope, $controllerConstructor, mockEmployeeService, defered,location,mockDepartmentService,controller;
    beforeEach(module('MyApp'));
    beforeEach(inject(function ($controller, $rootScope, EmployeeService,DepartmentService,$q,$location) {
        scope = $rootScope.$new();
        mockEmployeeService = EmployeeService;
        $qService = $q;
        deferred = $qService.defer();
        $controllerConstructor = $controller;
        location = $location;
        mockDepartmentService=  DepartmentService;
    }));

    beforeEach(function () {
        controller = $controllerConstructor("EmployeeController", { $scope: scope, DepartmentService: mockDepartmentService, $window: {}, $modal: {}, EmployeeService: mockEmployeeService, $route: {}, $location: {}, $routeParams: {} });
    })

    it('scope paramenters and methods should be defined', function () {        
        expect(scope.emp).toBeDefined();
        expect(scope.goToChngePsw).toBeDefined();
        expect(scope.goToChngeProfile).toBeDefined();
        expect(scope.getAllDept).toBeDefined();
        expect(scope.ChangePsw).toBeDefined();
        expect(scope.getAdmin).toBeDefined();
        expect(scope.confirmEmail).toBeDefined();
    });

    it('getEmp method should call the getEmpById', function () {
        
       
        spyOn(mockEmployeeService, 'getEmpById').and.callFake(function () { return deferred.promise; });

        var user = { name: 'abc', username: 'PQR' };
        var mockuser = user;
        scope.getEmp();

        deferred.resolve(user);
        scope.$apply();
        expect(scope.emp).toBe(mockuser);
        expect(mockEmployeeService.getEmpById).toHaveBeenCalled();
        // expect(true).toBe(true);
    });

    it('confirmEmail method should call the confirmEmail service', function () {        

        spyOn(mockEmployeeService, 'confirm').and.callFake(function () { return deferred.promise; });

        var user = { name: 'abc', username: 'PQR' };
        scope.confirmEmail();
        expect(mockEmployeeService.confirm).toHaveBeenCalled();
        // expect(true).toBe(true);
    });

    it('should be able to call getCurrentAdmin and check data is returned or not ', function () {        

        spyOn(mockEmployeeService, 'getCurrentAdmin').and.callFake(function () { return deferred.promise; });
        
        var user = { name: 'abc', username: 'PQ' };
        var mockUser = user;
        mockUser.name = 'xyz';
        scope.getAdmin();
        deferred.resolve(user);
        scope.$apply();
        expect(scope.adminData).toBe(mockUser);
        
        expect(mockEmployeeService.getCurrentAdmin).toHaveBeenCalled();
        // expect(true).toBe(true);
    });

   

    it('should be able to call DeleteService', function () {        

        spyOn(mockEmployeeService, 'deleteEmp').and.callFake(function () { return deferred.promise; });       
        scope.delete();
        expect(mockEmployeeService.deleteEmp).toHaveBeenCalled();
        // expect(true).toBe(true);
    });
 
    it('should be able to call getAllDepartments of department service and the value returned is correct', function () {        
        var actualuser = { name: 'pqr', username: 'abc' };
        var mockUser = actualuser;
        spyOn(mockDepartmentService, 'getAllDepartments').and.callFake(function () { return deferred.promise; });
        scope.getAllDept();
        deferred.resolve(actualuser);
        scope.$apply();
       expect(scope.departments).toBe(mockUser);

        expect(mockDepartmentService.getAllDepartments).toHaveBeenCalled();
        // expect(true).toBe(true);
    });
})

