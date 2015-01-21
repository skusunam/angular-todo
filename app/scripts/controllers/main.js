'use strict';

angular.module('angularTodoApp')
  .controller('NavCtrl', function ($scope,$rootScope, $location, UserService) {

    //TODO: Find a better way to know the loggedIn status
    // 1) Will this $watch get executed in every digest cycle?
    // 2) What about child digest scope
    // 3) $apply vs $digest
    $scope.$watch(UserService.isUserLoggedIn, function(newVal, oldValue){
      console.log(newVal, oldValue);
      $scope.loggedIn = newVal;
    });

    $scope.logout = function(){
      UserService.setUserLoggedIn(false);
      $location.path('/login');
    }

  });
