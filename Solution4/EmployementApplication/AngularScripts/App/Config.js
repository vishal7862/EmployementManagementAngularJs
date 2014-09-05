/// <reference path="MyApp.js" />
app.config(function ($routeProvider) {
    $routeProvider.when('/Employees', {
        templateUrl: '/Templates/Employee.html',
        controller: 'EmployeeController'
    });
    $routeProvider.when('/Delete/:empId', {
        templateUrl: '/Templates/DeleteEmp.html',
        controller: 'EmployeeController'
    });
    $routeProvider.when('/Departments', {
        templateUrl: '/Templates/Departments.html',
        controller: 'DepartmentController'
    });
    $routeProvider.when('/DeleteDept/:deptId', {
        templateUrl: '/Templates/DeleteDept.html',
        controller: 'DepartmentController'
    });
    $routeProvider.when('/Login', {
        templateUrl: '/Templates/Login.html',
        controller: 'OwinController'
    });
    $routeProvider.when('/UserProfile', {
        templateUrl: '/Templates/UserProfile.html',
        controller: 'EmployeeController'
    });
    $routeProvider.when('/Home', {
        templateUrl: '/Templates/Home.html',
        controller: 'OwinController'
    });
    $routeProvider.when('/Settings', {
        templateUrl: '/Templates/Settings.html',
        controller: 'EmployeeController'
    });
    $routeProvider.when('/ChngePsw', {
        templateUrl: '/Templates/ChangePassword.html',
        controller: 'EmployeeController'
    });
    $routeProvider.when('/ChngeProfile', {
        templateUrl: '/Templates/ChangeProfile.html',
        controller: 'EmployeeController'
    });
    $routeProvider.when('/ConfirmEmail/:userId/:code*', {
        templateUrl: '/Templates/ConfirmEmail.html',
        controller: 'EmployeeController'
    });
    $routeProvider.when('/Admin', {
        templateUrl: '/Templates/Admin.html',
        controller: 'EmployeeController'
    });
    $routeProvider.otherwise({ redirectTo: '/Home' });
})
    
