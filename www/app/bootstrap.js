(function() {
    'use strict';

    function initCordova(){
        document.addEventListener("deviceready", function () {
            console.info("Cordova inicializado com sucesso");

            var plataforma = device.platform;
            $rootScope.device = platforma.toLowerCase();

        }, false);
    }

    function ajustarConteudo(){
        console.info("Ajustando...");
        var toolbar = document.getElementsByClassName('toolbar');
        var height = toolbar[0].offsetHeight;

        var content = document.getElementsByClassName('content');
        content[0].style.paddingTop = height + 'px';
    }

    angular.module('app',['ngRoute', 'ngCordova'])
    .config(function($routeProvider)
    {
        // Rotas
        $routeProvider
        .when('/', {
            templateUrl  : 'app/views/home.html',
            controller   : 'HomeController',
            controllerAs : 'Home'
        })
        .when('/pedido', {
            templateUrl  : 'app/views/pedido.html',
        })
        .when('/checkout', {
            templateUrl  : 'app/views/checkout.html',
        })
        .otherwise ({ redirectTo: '/' });
    })
    .run(function($rootScope, $timeout){

        initCordova();

        // Simular
        $rootScope.device = 'android';

        $timeout(function(){
            ajustarConteudo();
        }, 150);
    });

})();