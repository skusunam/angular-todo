'use strict';

angular.module('angularTodoApp')
  .controller('SignupCtrl', function ($scope) {

    console.log('SignupController called');

    $scope.save = function() {

      console.log($scope.registeredUser);

      ParseService.save($scope.registeredUser);
      
      //var User = Parse.Object.extend("User");
      //var user = new User();
      //
      //user.save({
      //  foo: "bar"
      //}).then(function(object) {
      //  alert("yay! it worked");
      //});
    }

  });
