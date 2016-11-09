(function() {
    'use strict';

    angular
        .module('app')
        .controller('PedidoController', PedidoController);

    // Dependencias
    PedidoController.$injector = ['$scope', '$timeout'];

    function PedidoController($scope, $timeout){

        $timeout(function(){
            ajustarConteudo();
        }, 90);

        function ajustarConteudo(){
            var toolbar = document.getElementsByClassName('toolbar');
            var height  = toolbar[0].offsetHeight;
            var content = document.getElementsByClassName('content');

            content[0].style.paddingTop = height + 'px';
        }

        this.fecharPedido = function(){
            // TODO
        }
    }

})();