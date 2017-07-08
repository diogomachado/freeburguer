(function() {
    'use strict';

    angular
        .module('app')
        .controller('CardapioController', CardapioController);

    CardapioController.$injector = ['$scope', '$timeout', '$location', '$routeParams', '$cordovaDialogs', 'firebaseTool'];

    function CardapioController($scope, $timeout, $location, $routeParams, $cordovaDialogs, firebaseTool){

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
                }else{
                    snackbar.timer("Nenhum lanche disponível", 3000);
                }

            }else{
                console.warn("Nenhuma empresa com esse ID.");
            }
        });

        // Observa se usuário vai selecionar algum item, para exibir o rodapé
        $scope.$watch('itens', function(){

            var selecionados = 0;
            var itens = [];

            $scope.valorTotalPedido = 0;

            angular.forEach($scope.itens, function(item, key){
                if (item.selecionado){

                    itens.push(key);

                    selecionados++;

                    $scope.valorTotalPedido += item.preco;
                }
            });

            // Grava os itens até então selecionados
            if (itens.length > 0){
                sessionStorage.setItem('freeburguer-itens', JSON.stringify(itens));
            }else{
                sessionStorage.removeItem('freeburguer-itens');
            }

            $scope.exibirResumoPedido = (selecionados > 0) ? true : false;

        }, true);

        this.fecharPedido = function(){

            $cordovaDialogs.confirm("Ao avançar você irá confirmar o seu pedido, iremos preparar o seu lanche e enviar ao motoboy, tem certeza disso?", "Atenção", ['Sim','Não'])
            .then(function(buttonIndex) {

                if (buttonIndex == 1){

                    // Dados do pedido
                    var pedido = {};

                    pedido.uid = gerarID();
                    pedido.empresa = $routeParams.id_empresa;
                    pedido.itens = $scope.itens;

                    // Cria um novo pedido
                    var pedido_id = firebaseTool.create('/pedidos/', pedido);

                    // Redireciona
                    $location.path('pedido-info/' + pedido_id);
                }
            });
        }

        function gerarID(){
            return 'P' + Math.random().toString(5).substr(2, 5);
        }
    }

})();