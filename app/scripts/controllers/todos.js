'use strict';

(function() {
    angular.module('angularTodoApp')
        .controller('TodosCtrl', TodosCtrl);

    TodosCtrl.$inject = [];
    function TodosCtrl() {
        console.log('TodosCtrl called');

        var vm = this;
    };
})();