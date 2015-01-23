'use strict';

(function() {
    angular.module('angularTodoApp')
        .controller('TodosCtrl', TodosCtrl);

    TodosCtrl.$inject = ['ParseService'];

    function TodosCtrl(ParseService) {
        console.log('TodosCtrl called');
        var vm = this;
        vm.todos = [];
        vm.addTodo = addTodo;

        getTodos();

        function addTodo(){
            console.log(vm.newTodo);

            var promise = ParseService.addTodo(vm.newTodo);
            promise.then(function(data){
                console.log("Go and update Todo's from Parse", data);
                vm.newTodo = null;
                // TODO: Instead of reloading an array can we just add this todo to existing array?
                //vm.todos.push(data);
                getTodos();
            })
        }

        function getTodos(){
            console.log("TodosCtrl : getTodos");

            var promise = ParseService.getTodos();
            promise.then(function(collection){
                vm.newTodo = null;
                vm.todos = [];
                collection.each(function(object) {
                    //console.warn(object.attributes);
                    vm.todos.push(object.attributes);
                });
                console.log(" Todos.lenght = ", vm.todos);
            })
        }
    };
})();