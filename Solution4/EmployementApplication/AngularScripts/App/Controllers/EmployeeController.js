/// <reference path="../MyApp.js" />

 
app.controller('EmployeeController', function EmployeeController($scope,DepartmentService,$window,EmployeeService,$location, $routeParams,$modal) {
    //$scope.transfer = function () {
    //    window.location.href = "#/login";
    //}
   
    $scope.isShow = false;
    $scope.open = function () {
     $scope.modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            size: 'lg',
         scope:$scope
        });
    }

    $scope.editEmpDialog = function (empId) {
        $scope.Id = empId;
        $scope.modalInstance = $modal.open({
            templateUrl: 'EditEmp.html',
            size: 'lg',
            scope: $scope
        });
    }

    $scope.getEmp = function () {
        EmployeeService.getEmpById($scope.Id).then(
            function (emp) {
                $scope.emp = emp;


            })
    }

    $scope.adminEmpEdit = function (data, EditEmp) {
        if (EditEmp.$valid) {
            EmployeeService.adminEdit(data).then(function (data) {
                $scope.modalInstance.dismiss('cancel');
                $scope.getAllEmp();
                $window.location.reload();
            });
        }
    }
    $scope.cancel = function () {

        $scope.modalInstance.dismiss('cancel');
    }

    $scope.getAllEmp = function () {
        EmployeeService.getAllEmployees().then(
            function (employees) {
                $scope.isShow = true;
           
                $scope.employees = employees;
                
            }
        );
    }
    $scope.saveEmp = function (emp, CreateEmp) {
        $scope.loadingElement = true;
        if (CreateEmp.$valid && (emp.Password==emp.ConfirmPassword)) {
            EmployeeService.registerEmployee(emp).then(function (data) {

                $scope.employees.push(data);
                $scope.modalInstance.dismiss('cancel');
                $scope.loadingElement = false;
            });
        } else {
            $scope.showing = true;
           
        }
    }
    $scope.getAllDept = function () {
        DepartmentService.getAllDepartments().then(
             function (departments) {
                 $scope.departments = departments;
             }
         );
    }

    $scope.delete = function () {
        EmployeeService.deleteEmp($routeParams.empId).then(
               function () {
                   window.location.href = "#/Employees";

               }
         );
      
    }
    $scope.getCurrEmp = function () {
        EmployeeService.getCurrentEmp().then(
            function (currEmpData) {
                $scope.currEmpData = currEmpData;

            })
    }


    $scope.emp = {};
    // selected deptId
    $scope.emp.DeptsValue = [];
    $scope.emp.DeptName = [];
    //$scope.toggleSelection = function (dept) {
    //    var idx = $scope.emp.DeptName.indexOf(dept);

    //    // is currently selected
    //    if (idx > -1) {
    //        $scope.emp.DeptName.splice(idx, 1);
    //        //$scope.emp.DeptsValue = selection;
    //    }

    //        // is newly selected
    //    else {
    //        $scope.emp.DeptName.push(dept);
    //        //$scope.emp.DeptsValue = selection;
    //    }
    //}
    // toggle selection for a given fruit by name
    $scope.toggleSelection = function(dept) {
        var idx = $scope.emp.DeptsValue.indexOf(dept);

        // is currently selected
        if (idx > -1) {
            $scope.emp.DeptsValue.splice(idx, 1);
            //$scope.emp.DeptsValue = selection;
        }

            // is newly selected
        else {
            $scope.emp.DeptsValue.push(dept);
            //$scope.emp.DeptsValue = selection;
        }
    }



    $scope.goToChngePsw = function () {
        $location.url('/ChngePsw');
    }
    $scope.goToChngeProfile = function () {
        $location.url('/ChngeProfile');
    }

    $scope.ChangeProfile = function (editEmp, ChngeProf) {
        if (ChngeProf.$valid) {
            EmployeeService.editCurrentEmp(editEmp).then(function (editEmp) {

                window.location.href = "#/UserProfile";
            });
        }
    }

    $scope.ChangePsw = function (editUser, ChngePsw) {
        if (ChngePsw.$valid && (editUser.NewPassword == editUser.ConfirmPassword)) {
            EmployeeService.editCurrentUserPsw(editUser).then(function (editUser) {

                $scope.chkerror = true;
                $scope.msgerror = "Password changed";
            
            }, function (error) {
                $scope.chkerror = true;
                $scope.msgerror = error.data.Message;
               
            });
        }
    }
    
    $scope.getAdmin = function () {
        EmployeeService.getCurrentAdmin().then(
            function (adminData) {
                $scope.adminData= adminData;

            })
    }

    $scope.confirmEmail = function () {
        EmployeeService.confirm($routeParams.userId, $routeParams.code).then(function () {
            //window.location.href = "#/ConfirmEmail";
        });
    }

});
