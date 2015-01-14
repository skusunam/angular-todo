'use strict';

angular
  .module('angularTodoApp', [
    'ngRoute'
  ])
  .config(function ($routeProvider) {

    Parse.initialize("quEQw1Yal6U7nYh9JUZ3eefGky4zF1kPpJOMzhwU", "2Cvg0ii5WHeVxU5ypCKeEwW1uAuB0y76u2ycYIlm");

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
