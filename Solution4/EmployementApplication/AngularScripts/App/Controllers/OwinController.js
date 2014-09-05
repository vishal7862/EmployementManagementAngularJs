/// <reference path="../MyApp.js" />
app.controller('OwinController', function OwinController($scope, LoginService, $route, $location, $routeParams, $cookieStore) {
    $scope.msg = "Hello";
    $scope.mesg = function () {
        return "Hello";
    }
    $scope.emailPattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    $scope.Login = function (user, LoginForm) {
        if (LoginForm.$valid) {
            LoginService.userLogin(user).then(function (emp) {

                if (emp.Email == "vishal@gmail.com") {
                    $cookieStore.put('User', emp);
                    $scope.check = $cookieStore.get('User');
                    console.log($cookieStore.get('User'));
                    window.location.href = "/Home/Index";
                } else {
                    $cookieStore.put('User', emp);
                    $scope.check = $cookieStore.get('User');
                    console.log($cookieStore.get('User'));
                    window.location.href = "/Home/Index";
                }
            }, function (error) { $scope.errorChk = true; $scope.invalidMsg = error.data.Message; });
        }
        else {
            $scope.chk = true;
            //$scope.errorMsg = LoginForm.$error.pattern;
        }
    }
    $scope.Logout = function () {
        LoginService.userLogout().then(function () { window.location.href = "#/Home" });
    }
    $scope.reload = function () {
        //$location.path('/Home');
        $route.reload();
    }
});
