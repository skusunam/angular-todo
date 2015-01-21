'use strict';

angular.module('angularTodoApp')

  .service('ParseService', function ($q) {
    this.signUp = function(registeredUser){
        var TodoUser = Parse.Object.extend('TodoUser');
        var todoUser = new TodoUser();
        todoUser.set("email", registeredUser.email);
        todoUser.set("firstName", registeredUser.firstName);
        todoUser.set("lastName", registeredUser.lastName);
        todoUser.set("password", registeredUser.password);

        var defer = $q.defer();
        todoUser.save({
            success: function(data){
                console.log("signup: success  " + data);
                defer.resolve(data);
            },
            error: function(error){
                console.log("signup: error", error);
                defer.reject(error);
            }
        });
        return defer.promise;
    };

    this.login = function(username, password) {
        var TodoUser = Parse.Object.extend('TodoUser');
        var query = new Parse.Query(TodoUser);
        query.equalTo("email", username);
        query.equalTo("password", password);

        var defer = $q.defer();
        query.count({
            success: function(count){
                console.log("login: count = " + count);
                defer.resolve(count)
            },
            error: function(error){
                console.log("login: error", error);
                defer.reject(error);
            }
        });
        return defer.promise;
    };

  });
