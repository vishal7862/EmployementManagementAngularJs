/// <reference path="../../Services/EmployeeService.js" />
describe('EmployeeService', function () {
    var employeeService;
    var httpBackend;
    beforeEach(module('MyApp'));
    beforeEach(inject(function (EmployeeService,$httpBackend) {
       
        employeeService = EmployeeService;
        httpBackend = $httpBackend;

    }));

    it('should issue a GET request to the ApiPath:/api/Values/GetAllEmp and return 200', function () {

        var emp = { name: 'vikral' };
        var mockemp = emp;
        httpBackend.expectGET('/api/Values/GetAllEmp').respond(200,null);
        promise = employeeService.getAllEmployees();
        httpBackend.flush();
    })

    it('should issue a GET request to the ApiPath:/api/Values/GetAllEmp and return 200', function () {

        var emp = { name: 'vikral' };
        var mockemp = emp;
        httpBackend.expectGET('/api/Account/GetCurrEmp').respond(emp);

        promise = employeeService.getCurrentEmp();
        httpBackend.flush();
        promise.then(function (result) {
            expect(result.name).toBe(mockemp.name);
        });
       
    })

    it('should issue a POST request to the ControllerPath:/Home/Register and return 200', function () {

        var emp = { name: 'vikral' };
        var mockemp = emp;
        httpBackend.expectPOST('/Home/Register').respond(emp);

        promise = employeeService.registerEmployee(emp);
        httpBackend.flush();
        promise.then(function (result) { 
            expect(result.name).toBe(mockemp.name);
        });

    })

    it('should issue a DELETE request to the ControllerPath:/Home/Del and return 200', function () {

        var emp = { name: 'vikral' ,id:3};
        var mockemp = emp;
        httpBackend.expectDELETE('/Home/Del?Id=3').respond(200, null);
        employeeService.deleteEmp(emp.id);
        httpBackend.flush();

    })

    it('should issue a POST request to the ApiPath:/api/Values/EditEmpByAdmin', function () {

        var emp = { name: 'vikral', id: 3 };
        var mockemp = emp;
        httpBackend.expectPOST('/api/Values/EditEmpByAdmin').respond(emp);
        promise=employeeService.adminEdit(emp);
        promise.then(function (result) {
            expect(result.name).toBe(mockemp.name);
        });
        httpBackend.flush();

    })


    it('should issue a GET request to the ControllerPath:/Home/ConfirmEmail', function () {

        var emp = { code: 'vikral', id: 3 };
        var mockemp = emp;
        httpBackend.expectGET('Home/ConfirmEmail?code=vikral&userId=3').respond(emp);
        promise = employeeService.confirm(emp.id,emp.code);
        promise.then(function (result) {
            expect(result.name).toBe(mockemp.name);
        });
        httpBackend.flush();

    })
});


//getAllEmployees: function () {

//    return $resource('/api/Values/GetAllEmp').query().$promise;
//},
//registerEmployee: function (empData) {
//    return $resource('/Home/Register').save(empData).$promise;
//},
//deleteEmp: function (Id) {
//    return $resource('/Home/Del', { Id: '@Id' }).remove({ Id: Id }).$promise;
//},
//getCurrentEmp: function () {
//    return $resource('/api/Account/GetCurrEmp').get().$promise;
//},
//editCurrentEmp: function (emp) {
//    return $resource('/api/Values/EditEmp').save(emp).$promise;
//},
//editCurrentUserPsw: function (editUser) {
//    return $resource('/api/Account/EditPassword').save(editUser).$promise;
//},
//getCurrentAdmin: function () {
//    return $resource('/api/Account/GetCurrAdmin').get().$promise;
//},
//getEmpById: function (Id) {
//    return $resource('/api/Values/GetEmpById', { Id: '@Id' }).get({ Id: Id }).$promise;
//},
//adminEdit: function (emp) {
//    return $resource('/api/Values/EditEmpByAdmin').save(emp).$promise;
//},
//confirm: function (userId, code) {
//    return $resource('Home/ConfirmEmail', { userId: '@userId', code: '@code' }).get({userId:userId,code:code}).$promise;
//}