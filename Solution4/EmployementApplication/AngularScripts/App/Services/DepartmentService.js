/// <reference path="../MyApp.js" />
app.factory("DepartmentService", function ($resource) {
    return {
        getAllDepartments: function () {
            return $resource('/api/Department/GetAllDept').query().$promise;
        },
        saveDept: function (deptData) {
            return $resource('/api/Department/PostCreate').save(deptData).$promise;
        },
        deleteDept: function (Id) {
            return $resource('/Home/DeleteDept', { Id: '@Id' }).remove({ Id: Id }).$promise
        },
        editCurrentDept: function (dept) {
            return $resource('/api/Department/EditDept').save(dept).$promise
        },
        getSingleDepartment: function (Id) {
            return $resource('/api/Department/GetSingleDept', { Id: '@Id' }).get({ Id: Id }).$promise;
        }
    };
});