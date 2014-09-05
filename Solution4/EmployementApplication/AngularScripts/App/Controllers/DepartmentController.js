/// <reference path="../MyApp.js" />
app.controller('DepartmentController', function DepartmentController($scope, DepartmentService, $routeParams, $modal) {
    $scope.isShow = false;

    $scope.al = function () {
        window.alert("he");
    }
    $scope.open = function () {
        $scope.modalInstance1 = $modal.open({
            templateUrl: 'CreateDept.html',
            size: 'lg',
            scope:$scope
        });
    };

    $scope.transfer = function () {
        window.location.href = "#/Home";
    }


    $scope.getAllDept = function () {
       
        DepartmentService.getAllDepartments().then(

             function (departments) {
                 $scope.isShow = true;
                 $scope.departments = departments;
                // window.location.href = "#/Departments";
             }
         );
    }

    $scope.test = "Test";
    $scope.create = function (Dept, CreateDept) {

        if (CreateDept.$valid) {

            DepartmentService.saveDept(Dept).then(
                        function (Dept) {
                            $scope.departments.push(Dept);
                            $scope.modalInstance1.dismiss('cancel');
                            // $scope.$apply();
                        }
            );
        }
    }
    $scope.delete = function () {
        DepartmentService.deleteDept($routeParams.deptId).then(
               function () {
                   window.location.href = "#/Departments";

               }
         );
    }
    $scope.editDept = function (Department, EditDept) {
        if (EditDept.$valid) {
            DepartmentService.editCurrentDept(Department).then(function (Department) {
                $scope.modalInstance1.dismiss('cancel');
                $scope.getAllDept();
              //  window.location.href = "#/Departments";
            });
        }
    }

    $scope.openEditDialog = function (deptId) {
        $scope.sum = deptId;
        $scope.modalInstance1 = $modal.open({
            templateUrl: 'EditDept.html',
            size: 'lg',
            scope:$scope
        });
    }
    $scope.cancel = function () {

        $scope.modalInstance1.dismiss('cancel');
    }

    $scope.getCurrDept = function () {
        DepartmentService.getSingleDepartment($scope.sum).then(
              function (currDeptData) {
                  $scope.currDeptData = currDeptData;

              })
    }


});
