app.factory("LoginService", function ($resource) {
    return {
        userLogin: function (user) {
            return $resource('/api/Account/Login').save(user).$promise;
        },
        userLogout: function () {
            return $resource('/api/Account/SignOut').save().$promise;
        }
    };
});