(function() {
    'use strict';

    angular
        .module('app')
        .controller('CheckoutController', CheckoutController);

    // Dependencias
    CheckoutController.$injector = ['$scope', '$rootScope', '$timeout', '$location'];

    function CheckoutController($scope, $rootScope, $timeout, $location){

        this.voltar = function(){
            $location.path('/');
        }
    }

})();