'use strict';

(function() {
    angular.module('angularTodoApp')
        .factory('ParseService', ParseService);

    function ParseService($q) {
        var parseService = {
            signup: signUp,
            login: login,
            getTodos: getTodos,
            addTodo: addTodo,
            removeTodo: removeTodo,
            todoCompleted: todoCompleted,
            markAllComplete: markAllComplete
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
                    defer.resolve(count)
                },
                error: function(error) {
                    console.log("login: error", error);
                    defer.reject(error);
                }
            });
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
                    console.log("collection ", collection);
                    defer.resolve(collection);
                  },
                  error: function(collection, error) {
                    defer.reject(error);
                  }
            });
            return defer.promise;
        };

        function addTodo(todo){
            var Todos = Parse.Object.extend("Todos");
            var todos = new Todos();
            todos.set('title', todo);
            todos.set('isComplete', false);

            var defer = $q.defer();
            todos.save({
                success: function(data){
                    defer.resolve(data)
                },
                error: function(error){
                    console.log("Error happened while saving '"+todo+"' to Parse.", error);
                    defer.reject(error);
                }
            })
            return defer.promise;
        };

        function removeTodo(todo){
            var Todos = Parse.Object.extend("Todos");
            var query = new Parse.Query(Todos);

            var defer = $q.defer();
            query.get(todo.id, {
                success: function(todo){
                    todo.destroy({
                        success: function(status){
                            defer.resolve(status);
                        },
                        error: function(error){
                            defer.reject(error);
                        }
                    });
                },
                error: function(error){
                    defer.reject(error);
                }
            })
            return defer.promise;
        };

         function todoCompleted(todo){
            var Todos = Parse.Object.extend("Todos");
            var query = new Parse.Query(Todos);

            var defer = $q.defer();
            query.get(todo.id, {
                success: function(updatedTodo){
                    updatedTodo.set('isComplete', todo.isComplete);
                    updatedTodo.save({
                        success: function(){
                            console.log("todo's icCompleted updated succesfully", updatedTodo.get('isComplete'));
                            defer.resolve();
                        },
                        error: function(){
                            defer.reject(error);
                        }
                    });
                },
                error: function(error){
                    defer.reject(error);
                }
            })
            return defer.promise;
         };

         function markAllComplete(todos){
            var promises = [];
            todos.forEach(function(todo){
                //todo.isComplete = isComplete;
                promises.push(todoCompleted(todo));
            });
            console.log('promises = ', promises);
            return $q.all();
         }

    };
})();
