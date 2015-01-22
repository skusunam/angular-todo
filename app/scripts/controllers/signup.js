'use strict';

(function() {
    angular.module('angularTodoApp')
        .controller('SignupCtrl', SignupCtrl);


    SignupCtrl.$inject = ['$location', 'ParseService', 'UserService'];

    function SignupCtrl($location, ParseService, UserService) {
        console.log('SignupController called');

        var vm = this;

        vm.save = save;
        vm.registeredUser = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        };

        function save() {
            console.log(vm.registeredUser);
            ParseService.signUp(vm.registeredUser)
                .then(function() {
                    UserService.setMessage('User Saved Succesfully. Please login with your credentials.');

                    console.log(vm.status);
                    $location.path('/login');
                });
        }
    }
})();
