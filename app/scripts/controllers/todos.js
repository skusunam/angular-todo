'use strict';

(function() {
    angular.module('angularTodoApp')
        .controller('TodosCtrl', TodosCtrl);

    function TodosCtrl($scope) {
        console.log('TodosCtrl called');
    };
})();
