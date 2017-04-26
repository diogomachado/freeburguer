(function() {
    'use strict';

    angular
        .module('app')
        .controller('PedidoInfoController', PedidoInfoController);

    PedidoInfoController.$injector = ['$scope', '$rootScope', '$timeout', '$location'];

    function PedidoInfoController($scope, $rootScope, $timeout, $location){

        this.cadastrarContato = function(){

            // TODO: mudar nome empresa
            var contato = navigator.contacts.create({"displayName": "Empresa Freeburguer"});

            var numeros = [];

            numeros[0] = new ContactField('Trabalho', '99999-1010', false);
            numeros[1] = new ContactField('Celular', '99999-2222', true);

            // Atribui o array de números
            contato.phoneNumbers = numeros;

            // Salva o contato
            contato.save();

            // Exibir alerta
            snackbar.timer("Contato salvo", 3000);
        }
    }

})();