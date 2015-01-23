'use strict';

(function() {
    angular.module('angularTodoApp', [
            'ngRoute',
            'ngAnimate'
        ])
        .run(run)
        .config(config);

    function run($rootScope, $location) {
        $rootScope.$on('$routeChangeError', function(event, current, previous) {
            console.log('$routeChangeError');
            if (!event.authenticated) {
                $location.path('/login');
            }
        });
    };

    function config($routeProvider) {
        Parse.initialize("quEQw1Yal6U7nYh9JUZ3eefGky4zF1kPpJOMzhwU", "2Cvg0ii5WHeVxU5ypCKeEwW1uAuB0y76u2ycYIlm");

        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html'
            })
            .when('/signup', {
                templateUrl: 'views/signup.html',
                controller: 'SignupCtrl',
                controllerAs: 'signup'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'login'
            })
            .when('/todos', {
                templateUrl: 'views/todos.html',
                controller: 'TodosCtrl',
                controllerAs: 'todos',
                resolve: {
                    isAuthenticated: verifyIfAuthenticated
                }
            })
            .otherwise({
                redirectTo: '/'
            });

        verifyIfAuthenticated.$inject = ['$q', 'UserService'];

        function verifyIfAuthenticated($q, UserService) {
            // var defer = $q.defer();
            if (UserService.isUserLoggedIn()) {
                //defer.resolve();
                return $q.when(true);
            } else {
                //defer.reject({ authenticated: false });
                return $q.reject({
                    authenticated: false
                });
            }
            //return defer.promise;
        };
    };

})();
