(function() {
    'use strict';

    angular
        .module('app')
        .controller('PedidoController', PedidoController);

    // Dependencias
    PedidoController.$injector = ['$scope', '$timeout'];

    function PedidoController($scope, $timeout){

        // Nos ajuda a controlar a view
        $scope.exibirResumoPedido = false;

        $timeout(function(){
            ajustarConteudo();
        }, 200);

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

            if (selecionados > 0){
                $scope.exibirResumoPedido = true;

                $timeout(function(){
                    ajustarRodape();
                }, 200);
            }else{
                $scope.exibirResumoPedido = false;
            }

        }, true);

        function ajustarConteudo(){
            var toolbar = document.getElementsByClassName('toolbar');
            var height  = toolbar[0].offsetHeight;
            var content = document.getElementsByClassName('content');

            content[0].style.paddingTop = height + 'px';
        }

        function ajustarRodape(){
            var footer  = document.getElementsByClassName('footer-pedido');
            var height  = footer[0].offsetHeight;
            var content = document.getElementsByClassName('content');

            content[0].style.paddingBottom = height + 'px';
        }

        this.fecharPedido = function(){
            // TODO
        }
    }

})();