app.factory("EmployeeService", function ($resource) {
    return {
        getAllEmployees: function () {
         
            return $resource('/api/Values/GetAllEmp').query().$promise;
        },
        registerEmployee: function (empData) {
            return $resource('/Home/Register').save(empData).$promise;
        },
        deleteEmp: function (Id) {
            return $resource('/Home/Del', { Id: '@Id' }).remove({ Id: Id }).$promise;
        },
        getCurrentEmp: function () {
            return $resource('/api/Account/GetCurrEmp').get().$promise;
        },
        editCurrentEmp: function (emp) {
            return $resource('/api/Values/EditEmp').save(emp).$promise;
        },
        editCurrentUserPsw: function (editUser) {
            return $resource('/api/Account/EditPassword').save(editUser).$promise;
        },
        getCurrentAdmin: function () {
            return $resource('/api/Account/GetCurrAdmin').get().$promise;
        },
        getEmpById: function (Id) {
            return $resource('/api/Values/GetEmpById', { Id: '@Id' }).get({ Id: Id }).$promise;
        },
        adminEdit: function (emp) {
            return $resource('/api/Values/EditEmpByAdmin').save(emp).$promise;
        },
        confirm: function (userId, code) {
            return $resource('Home/ConfirmEmail', { userId: '@userId', code: '@code' }).get({userId:userId,code:code}).$promise;
        }



    };
});