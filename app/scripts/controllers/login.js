'use strict';

(function() {
    angular.module('angularTodoApp')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$location', 'UserService', 'ParseService'];

    function LoginCtrl($location, UserService, ParseService) {
        var vm = this;

        vm.message = UserService.getMessage();
        vm.login = login;
        vm.user = {
            username: '',
            password: ''
        };

        function login(){
            console.log(vm.user.username, vm.user.password);
            ParseService.login(vm.user.username, vm.user.password)
                .then(function(count) {
                    console.log('user count = ' + count);
                    if (count === 0) {
                        vm.message = 'Invalid credentials. Please verify email/password';
                    } else {
                        //When new user is created, userService message is set. but we are not clearing that up.
                        //this line clears the message set elsewhere. Does this have any other impact ?
                        //what is the correct use of message in UserService ?
                        UserService.setMessage('');
                        UserService.setUserLoggedIn(true);
                        $location.path('/todos');
                    }
                });
        };
    };
})();
