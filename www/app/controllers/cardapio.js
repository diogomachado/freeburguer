(function() {
    'use strict';

    angular
        .module('app')
        .controller('CardapioController', CardapioController);

    CardapioController.$injector = ['$scope', '$timeout', '$location', '$routeParams'];

    function CardapioController($scope, $timeout, $location, $routeParams){

        // Nos ajuda a controlar a view
        $scope.exibirResumoPedido = false;

        // Carrega os produtos
        var db = firebase.database();
        var empresa = db.ref('empresas/' + $routeParams.id_empresa);

        empresa.on('value', function(snapshot){

            if (snapshot.val()){

                var empresa = snapshot.val();

                if (empresa.produtos){
                    $scope.nome = empresa.nome;
                    $scope.itens = empresa.produtos;
                    $scope.$apply();
                }else{
                    alert("Nenhum lanche adicionado!");
                }

            }else{
                console.warn("Nenhuma empresa com esse ID.");
            }
        });

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