'use strict';

(function() {
    angular.module('angularTodoApp')
        .controller('LoginCtrl', LoginCtrl);

    function LoginCtrl($scope, $location, UserService, ParseService) {
        $scope.message = UserService.getMessage();

        $scope.login = function() {
            console.log($scope.username, $scope.password);
            ParseService.login($scope.username, $scope.password)
                .then(function(count) {
                    console.log('user count = ' + count);
                    if (count === 0) {
                        $scope.message = 'Invalid credentials. Please re-enter email \ password';
                    } else {
                        UserService.setUserLoggedIn(true);
                        $location.path('/todos');
                    }
                });
        }
    };
})();
