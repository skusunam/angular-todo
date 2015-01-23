'use strict';

(function() {
    angular.module('angularTodoApp')
        .factory('ParseService', ParseService);

    function ParseService($q) {
        var parseService = {
            signup: signUp,
            login: login,
            addTodo: addTodo,
            getTodos: getTodos
        }
        return parseService;

        function signUp(registeredUser) {
            var TodoUser = Parse.Object.extend('TodoUser');
            var todoUser = new TodoUser();
            todoUser.set("email", registeredUser.email);
            todoUser.set("firstName", registeredUser.firstName);
            todoUser.set("lastName", registeredUser.lastName);
            todoUser.set("password", registeredUser.password);

            var defer = $q.defer();
            todoUser.save({
                success: function(data) {
                    console.log("signup: success  " + data);
                    defer.resolve(data);
                },
                error: function(error) {
                    console.log("signup: error", error);
                    defer.reject(error);
                }
            });
            return defer.promise;
        };

        function login(username, password) {
            var TodoUser = Parse.Object.extend('TodoUser');
            var query = new Parse.Query(TodoUser);
            query.equalTo("email", username);
            query.equalTo("password", password);

            var defer = $q.defer();
            query.count({
                success: function(count) {
                    console.log("login: count = " + count);
                    defer.resolve(count)
                },
                error: function(error) {
                    console.log("login: error", error);
                    defer.reject(error);
                }
            });
            return defer.promise;
        };

        function addTodo(todo){
            var Todos = Parse.Object.extend("Todos");
            var todos = new Todos();
            todos.set('name', todo);
            todos.set('isComplete', false);

            var defer = $q.defer();
            todos.save({
                success: function(data){
                    console.log(todo + " added succesfully !!!", data);
                    defer.resolve(data)
                },
                error: function(error){
                    console.log("Error happened while saving '"+todo+"' to Parse.", error);
                    defer.reject(error);
                }
            })
            return defer.promise;
        };

        function getTodos(){
            var Todos = Parse.Object.extend("Todos");
            var Todos = Parse.Collection.extend({
                model: Todos
            });
            var todos = new Todos();
            var defer = $q.defer();
            todos.fetch({
                success: function(collection) {
                    console.log("collection", collection);
                    collection.each(function(object) {
                      console.warn(object.attributes);
                    });
                    defer.resolve(collection);
                  },
                  error: function(collection, error) {
                    // The collection could not be retrieved.
                    defer.reject(error);
                  }
            });
            return defer.promise;
        };
    };
})();
