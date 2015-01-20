'use strict';

angular.module('angularTodoApp')
  .controller('SignupCtrl', function ($scope, $location, ParseService, UserService) {

    console.log('SignupController called');

    $scope.save = function() {
      console.log($scope.registeredUser);
      ParseService.signUp($scope.registeredUser)
        .then(function(){
          $scope.status = 'User Saved Succesfully. Please login with your credentials.';

          UserService.setUser($scope.registeredUser);
          UserService.setMessage($scope.status);

          console.log($scope.status);
          $location.path('/login');
          $scope.$apply();
          console.log($location.path());
        });
    }
  });
