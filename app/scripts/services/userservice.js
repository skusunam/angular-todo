'use strict';

(function() {
    angular.module('angularTodoApp')
        .service('UserService', UserService);

    function UserService() {
        var user = {};
        var message;
        var loggedIn = false;

        this.setMessage = function(newMessage) {
            message = newMessage;
        };

        this.getMessage = function() {
            return message;
        };

        this.getUser = function() {
            return user;
        };

        this.setUser = function(newUser) {
            user = newUser;
        };

        this.setUserLoggedIn = function(status) {
            loggedIn = status;
        };

        this.isUserLoggedIn = function() {
            return loggedIn;
        };
    };
})();
