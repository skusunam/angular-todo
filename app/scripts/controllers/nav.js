'use strict';

(function() {
    angular.module('angularTodoApp')
        .controller('NavCtrl', NavCtrl);

    NavCtrl.$inject = ['$scope', '$location', 'UserService'];

    function NavCtrl($scope, $location, UserService) {
        var vm = this;
        vm.loggedIn = false;
        vm.logout = function() {
            UserService.setUserLoggedIn(false);
            $location.path('/login');
        }

        //TODO: Find a better way to know the loggedIn status
        // 1) Will this $watch get executed in every digest cycle?
        // 2) What about child digest scope
        // 3) $apply vs $digest
        $scope.$watch(UserService.isUserLoggedIn, function(newVal, oldValue) {
            vm.loggedIn = newVal;
        });
    };
})();
