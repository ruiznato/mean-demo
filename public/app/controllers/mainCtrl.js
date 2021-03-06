angular.module('mainCtrl', [])

.controller('mainController', function($rootScope, $location, Auth) {
    var vm = this;

    vm.loggedIn = Auth.isLoggedIn();

    // validate user on every request
    $rootScope.$on('$routeChangeStart', function() {
        vm.loggedIn = Auth.isLoggedIn();

        Auth.getUser()
            .then(function(data) {
                vm.user = data.data;
            });
    });


    // login handler
    vm.doLogin = function() {
        vm.processing = true;

        Auth.login(vm.loginData.username, vm.loginData.password)
            .success(function(data) {
                vm.processing = false;

                if (data.success) {
                    Auth.getUser()
                        .then(function(data) {
                            console.log(data.data)
                            vm.user = data.data;
                        });
                    $location.path('/users');
                } else {
                    vm.error = data.message;
                }
            });
    };

    vm.doLogout = function() {
        Auth.logout();
        vm.user = {};
        $location.path('/login');
    };
});