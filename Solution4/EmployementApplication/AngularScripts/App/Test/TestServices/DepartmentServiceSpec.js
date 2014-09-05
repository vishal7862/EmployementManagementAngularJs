describe('DepartmentService', function () {
    var departmentService, httpBackend;
    beforeEach(module('MyApp'));

    beforeEach(inject(function (DepartmentService, $httpBackend) {
        departmentService = DepartmentService;
        httpBackend = $httpBackend;
    }));

    it('should issue a GET request to ApiPath:/api/Department/GetAllDept', function () {
         
        //httpBackend.when('GET', '/api/Department/GetAllDept').respond();
            httpBackend.expectGET('/api/Department/GetAllDept').respond(200,null);
        departmentService.getAllDepartments();
        httpBackend.flush();
    })

    it('should issue a POST request to the ApiPath:/api/Department/PostCreate', function () {
       
        var dept = { name:'IT'};
        var mockdept = dept;
        httpBackend.when('POST', '/api/Department/PostCreate').respond(dept);
        promise = departmentService.saveDept(dept);
        promise.then(function (result) {
            expect(result.name).toBe(mockdept.name);
        });
        httpBackend.flush();
    })

    it('should issue a DELETE request to the ControllerPath:/Home/DeleteDept?Id=1 and return 200(ok)', function () {
        var id = 1;

        httpBackend.expectDELETE('/Home/DeleteDept?Id=1').respond(200, null);
        departmentService.deleteDept(id);
      
        httpBackend.flush();
    })

    it('should issue a POST request to the ApiPath:/api/Department/EditDept and return 200(ok)', function () {
        var dept = { name: 'IT' };
        var mockdept = dept;

        httpBackend.expectPOST('/api/Department/EditDept').respond(200, null);
        promise=departmentService.editCurrentDept(dept);

        promise.then(function (result) {
            expect(result.name).toBe(mockdept.name);
        });
        httpBackend.flush();
    })

    it('should issue a GET request to the ApiPath:/api/Department/GetSingleDept', function () {
        var dept = { name: 'IT' ,Id:3 };
        var mockdept = dept;
     //   var id = 3;
        httpBackend.when('GET','/api/Department/GetSingleDept?Id=3').respond(dept);
        promise = departmentService.getSingleDepartment(dept.Id);

        promise.then(function (result) {
            expect(result.Id).toBe(mockdept.Id);
        });
        httpBackend.flush();
    })
});
