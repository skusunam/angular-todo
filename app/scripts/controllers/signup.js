'use strict';

(function() {
    angular.module('angularTodoApp')
        .controller('SignupCtrl', function($scope, $location, ParseService, UserService) {
            console.log('SignupController called');

            $scope.save = function() {
                console.log($scope.registeredUser);
                ParseService.signUp($scope.registeredUser)
                    .then(function() {
                        UserService.setMessage('User Saved Succesfully. Please login with your credentials.');

                        console.log($scope.status);
                        $location.path('/login');
                    });
            }
        });
})();
