(function() {
    'use strict';

    angular
        .module('app')
        .controller('PedidoController', PedidoController);

    // Dependencias
    PedidoController.$injector = ['$scope', '$timeout', '$location'];

    function PedidoController($scope, $timeout, $location){

        // Nos ajuda a controlar a view
        $scope.exibirResumoPedido = false;

        // Lanches
        // TODO: Virão do firebase
        $scope.itens = [
            {
                nome : 'X-Burguer',
                ingredientes: 'Pão, Carne, e Batata',
                preco: 5.90,
                selecionado: false
            },
            {
                nome : 'X-Bacon',
                ingredientes: 'Pão, Carne, Queijo, Bacon e Batata',
                preco: 9.90,
                selecionado: false
            },
            {
                nome : 'X-Tudo',
                ingredientes: 'Pão, Carne, Queijo, Ovo, Presunto, Bacon e Batata',
                preco: 13.50,
                selecionado: false
            },
        ];

        // Observa se usuário vai selecionar algum item, para exibir o rodapé
        $scope.$watch('itens', function(){

            var selecionados = 0;
            $scope.valorTotalPedido = 0;

            angular.forEach($scope.itens, function(item, key){
                if (item.selecionado){
                    selecionados++;

                    $scope.valorTotalPedido += item.preco;
                }
            });

            $scope.exibirResumoPedido = (selecionados > 0) ? true : false;

        }, true);

        this.fecharPedido = function(){
            $location.path('checkout');
        }
    }

})();