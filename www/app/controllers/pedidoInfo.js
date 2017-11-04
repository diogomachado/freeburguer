(function() {
    'use strict';

    angular
        .module('app')
        .controller('PedidoInfoController', PedidoInfoController);

    PedidoInfoController.$injector = ['$scope', '$rootScope', '$timeout', '$routeParams', '$firebaseObject'];

    function PedidoInfoController($scope, $rootScope, $timeout, $routeParams, $firebaseObject){

        $rootScope.carregar = true;

        // Carrega o pedido
        $scope.pedido = $firebaseObject(firebase.database().ref().child('pedidos/' + $routeParams.id_pedido));

        // Assim que carregar do firebase
        $scope.pedido.$loaded().then(function() {

            $scope.total_pedido = 0;

            // Calcula o valor total do pedido
            angular.forEach($scope.pedido.itens, function(item, key){
                $scope.total_pedido += item.preco;
            });

            $scope.empresa = $firebaseObject(firebase.database().ref().child('empresas/' + $scope.pedido.empresa));

            $scope.empresa.$loaded().then(function() {
                $rootScope.carregar = false;
            });
        });

        this.cadastrarContato = function(){

            navigator.notification.confirm(
                'Tem certeza que deseja cadastrar o contato no aparelho?', // Mensagem
                callbackDismiss, // Função de callback
                'Atenção',   // Título
                ['Sim','Não']    // buttonName
            );

            function callbackDismiss(buttonIndex){

                if (buttonIndex == 1){

                    // Nome da empresa
                    var contato = navigator.contacts.create({"displayName": $scope.empresa.nome });

                    // Array de números
                    var numeros = [];

                    // True do terceiro parametro identifica o número prioritário
                    numeros[0] = new ContactField('Celular', $scope.empresa.telefone, true);

                    contato.phoneNumbers = numeros;
                    contato.save();

                    // Exibir alerta
                    snackbar.timer("Contato salvo", 3000);
                }
            }
        }
    }

})();