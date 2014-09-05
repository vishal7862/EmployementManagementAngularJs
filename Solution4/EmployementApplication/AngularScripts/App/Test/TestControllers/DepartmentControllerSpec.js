describe('DepartmentController', function () {
    var scope, $controllerConstructor, mockDepartmentService, defered,controller;
    beforeEach(module('MyApp'));


    beforeEach(inject(function ($controller, $rootScope, DepartmentService, $q) {
        scope = $rootScope.$new();
        mockDepartmentService = DepartmentService;
        $qService = $q;
        deferred = $qService.defer();
        $controllerConstructor = $controller;

    }));

    beforeEach(function () {
        var controller = $controllerConstructor('DepartmentController', { $scope: scope, DepartmentService: mockDepartmentService, $routeParams: {}, $modal: {} });

    });

    it('getAllDept  method should invoke department service upon calling of the method', function () {
      
        spyOn(mockDepartmentService, 'getAllDepartments').and.callFake(function () { return deferred.promise; });
        scope.getAllDept();
        expect(mockDepartmentService.getAllDepartments).toHaveBeenCalled();

    });

    it('should create department if form is valid', function () {
        var dept = { name:'' };
        var form = {};
        form.$valid = false;
        
        if (dept.name == null || dept.name == "")
        {
            form.$valid = false;

        }
        else {
            form.$valid = true;
        }

        spyOn(mockDepartmentService, 'saveDept').and.callFake(function () { return deferred.promise; });
        scope.create(dept, form);


        if (form.$valid == true) {
            
            expect(mockDepartmentService.saveDept).toHaveBeenCalled();
            
        }
        else {

            expect(mockDepartmentService.saveDept).not.toHaveBeenCalled();
            
        }
              
    });

    it('should invoke deleteDept method of department service upon calling of delete method ', function () {

        spyOn(mockDepartmentService, 'deleteDept').and.callFake(function () { return deferred.promise; });
        scope.delete();
        expect(mockDepartmentService.deleteDept).toHaveBeenCalled();
    });

    it('should invoke getSingleDepartment mehtod with parameter of department service upon calling of getCurrDept', function () {
        scope.sum= 1 ;
        spyOn(mockDepartmentService, 'getSingleDepartment').and.callFake(function () { return deferred.promise; });
        scope.getCurrDept();
        expect(mockDepartmentService.getSingleDepartment).toHaveBeenCalledWith(1);
        // expect(mockDepartmentService.getSingleDepartment).toHaveBeenCalledWith(2); calling this would lead to error as it will differ from actual values
    });


    it('should invoke editCurrentDept with parameter method of department service upon calling of editDept', function () {
        var dept = 'IT';

        var form = {};
        form.$valid = true;
        spyOn(mockDepartmentService, 'editCurrentDept').and.callFake(function (dept) { return deferred.promise; });
        scope.editDept(dept,form);
        expect(mockDepartmentService.editCurrentDept).toHaveBeenCalledWith('IT');
    });
})

