'use strict';

angular.module('angularTodoApp')
  .service('ParseService', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.signUp = function(registeredUser){

        var TodoUser = Parse.Object.extend('TodoUser');
        var todoUser = new TodoUser();

        return todoUser.save(registeredUser);
    };

    this.login = function(username, password) {
        var TodoUser = Parse.Object.extend('TodoUser');
        var query = new Parse.Query(TodoUser);
        query.equalTo("email", username);
        query.equalTo("password", password);

        return query.count();
    };

  });
