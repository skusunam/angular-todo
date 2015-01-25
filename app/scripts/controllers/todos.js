'use strict';

(function() {
    angular.module('angularTodoApp')
        .controller('TodosCtrl', TodosCtrl);

    TodosCtrl.$inject = ['ParseService', 'UserService'];

    function TodosCtrl(ParseService, UserService) {
        var vm = this;
        vm.newTodo = '';
        vm.allChecked = false;
        vm.addTodo          =   addTodo;
        vm.removeTodo       =   removeTodo;
        vm.todoCompleted    =   todoCompleted;
        vm.markAll          =   markAll;

        getTodos();

        /*
            1. Trim new todo so that if length is zero we should not attempt to save
        */
        function addTodo(){
            var newTodo = vm.newTodo.trim();
            if(newTodo.length === 0){
                //UserService.setMessage('Please Enter valid todo');
                return
            }
            var promise = ParseService.addTodo(vm.newTodo);
            vm.busyPromise = promise;
            promise.then(function(data){
                vm.newTodo = '';
                vm.todos.push(_.extend(data.attributes, {id: data.id}));
            })
        };

        function removeTodo(todo){
            console.log('removeTodo', vm.todos, todo);
            var promise = ParseService.removeTodo(todo);
            vm.busyPromise = promise;
            promise.then(function(data){
                vm.todos.splice(vm.todos.indexOf(todo), 1);
            })
        };

        function todoCompleted(todo){
            console.log('todoCompleted ', todo);
            vm.busyPromise = ParseService.todoCompleted(todo);;
        };

        function markAll(allChecked){
            vm.allChecked = !allChecked;
            console.log("markAll : isComplete " + vm.allChecked);
            vm.todos.forEach(function(todo){
                if(vm.allChecked){
                    todo.isComplete = true;
                } else {
                    todo.isComplete = false;
                }
            });
            //TODO: spinner not showing investigate
            var promises = ParseService.markAllComplete(vm.todos);
            vm.busyPromise = promises;
        };

        function getTodos(){
            var promise = ParseService.getTodos();
            vm.busyPromise = promise;
            promise.then(function(collection){
                vm.newTodo = null;
                vm.todos = [];
                collection.each(function(object) {
                    vm.todos.push(_.extend(object.attributes, {id: object.id}));
                });
            })
        };
    };
})();