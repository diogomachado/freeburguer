(function() {
    'use strict';

    angular
        .module('app')
        .controller('PedidoBuscaController', PedidoBuscaController);

    PedidoBuscaController.$injector = ['$scope', '$rootScope', '$location','$cordovaVibration', '$cordovaDialogs'];

    function PedidoBuscaController($scope, $rootScope, $location, $cordovaVibration, $cordovaDialogs){

        this.buscar = function(){

            // Exibe carregamento
            $rootScope.carregar = true;

            // Manda encontrar
            encontrar($scope.codigo_pedido);
        }

        // Realiza a busca na plataforma Firebase
        function encontrar(codigo){

            // Inicializa
            var db = firebase.database();

            var pedidos = db.ref('pedidos');

            // Prepara a busca filtrando
            var query = pedidos
                        .orderByChild('codigo')
                        .equalTo(codigo)
                        .limitToFirst(1);

            query.on('value', function(snapshot){

                if (snapshot.val()){

                    var pedido = snapshot.val();
                    var keys = Object.keys(pedido);

                    // Redireciona
                    $location.path('pedido-info/' + keys[0]);

                    // Retira carregamento
                    $rootScope.carregar = false;

                    // Para forçar o redirect
                    $scope.$apply();

                }else{

                    $rootScope.carregar = false;

                    $cordovaVibration.vibrate(100);

                    $cordovaDialogs.alert('Pedido não encontrado.', 'Ops :(', 'Ok')
                    .then(function() {
                      // callback success
                    });
                }
            });
        }
    }

})();