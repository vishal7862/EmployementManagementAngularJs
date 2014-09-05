/// <reference path="../MyApp.js" />

app.directive('checkBox', function () {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: '/Templates/CheckBox.html',
        controller: 'DepartmentController',
        scope: {
       
        
        }
    }

});