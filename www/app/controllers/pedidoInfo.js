(function() {
    'use strict';

    angular
        .module('app')
        .controller('PedidoInfoController', PedidoInfoController);

    PedidoInfoController.$injector = ['$scope', '$rootScope', '$timeout', '$location'];

    function PedidoInfoController($scope, $rootScope, $timeout, $location){

        this.voltar = function(){
            $location.path('/');
        }
    }

})();