(function() {
    'use strict';

    angular
        .module('app')
        .controller('CheckoutController', CheckoutController);

    // Dependencias
    CheckoutController.$injector = ['$scope', '$timeout'];

    function CheckoutController($scope, $timeout){

        $timeout(function(){
            ajustarConteudo();
        }, 90);
    }

})();