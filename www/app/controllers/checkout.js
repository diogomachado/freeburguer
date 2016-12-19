(function() {
    'use strict';

    angular
        .module('app')
        .controller('CheckoutController', CheckoutController);

    // Dependencias
    CheckoutController.$injector = ['$scope', '$rootScope', '$timeout', '$location'];

    function CheckoutController($scope, $rootScope, $timeout, $location){

        $timeout(function(){
            ajustarConteudo();
        }, 90);

        function ajustarConteudo(){
            var toolbar = document.getElementsByClassName('toolbar');
            var height  = toolbar[0].offsetHeight;
            var content = document.getElementsByClassName('content');

            content[0].style.paddingTop = height + 'px';
        }

        this.voltar = function(){
            $location.path('/');
        }
    }

})();