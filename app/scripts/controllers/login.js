'use strict';

/**
 * @ngdoc function
 * @name angularTodoApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the angularTodoApp
 */
angular.module('angularTodoApp')
  .controller('LoginCtrl', function ($scope, $location, UserService, ParseService) {
    console.log('LoginCtrl called');

    $scope.message = UserService.getMessage();
    UserService.setMessage(null);

    $scope.login = function() {
        console.log($scope.username, $scope.password);
        ParseService.login($scope.username, $scope.password)
            .then(function(count){
                console.log('user count = ' + count);

                if(count === 0 ){
                    $scope.message = 'Invalid credentials. Please re-enter email \ password';
                    $scope.$apply();
                } else {
                    //UserService.setUser({'email': $scope.username, 'password': $scope.password});
                    UserService.setUserLoggedIn(true);

                    $location.path('/todos');
                    //TODO: Why do we need this?
                    $scope.$apply();
                }
            });
    }

  });
