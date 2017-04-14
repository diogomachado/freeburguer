(function() {
    'use strict';

    angular.module('app',['ngRoute', 'ngCordova', 'ngAnimate'])
    .config(function($routeProvider)
    {
        $routeProvider
        // Página inicial
        .when('/', {
            templateUrl  : 'app/views/home.html',
            controller   : 'HomeController',
            controllerAs : 'Home'
        })
        // Rota para abrir o cardápio da empresa
        .when('/cardapio/:id_empresa', {
            templateUrl  : 'app/views/cardapio.html',
            controller   : 'CardapioController',
            controllerAs : 'Cardapio'
        })
        // Rota para fazer a buscar por um pedido
        .when('/buscar-pedido', {
            templateUrl  : 'app/views/buscar-pedido.html',
            controller   : 'BuscarPedidoController',
            controllerAs : 'BuscarPedido'
        })
        // Rota para ver informações de um pedido
        .when('/checkout', {
            templateUrl  : 'app/views/checkout.html',
            controller   : 'CheckoutController',
            controllerAs : 'Checkout'
        })
        .otherwise ({ redirectTo: '/' });
    })
    .run(function($rootScope, $location){

        // TODO: remover ao lançar
        $rootScope.device = 'android';

        document.addEventListener("deviceready", function () {

            // Identifica a plataforma (ios|android)
            var plataforma = device.platform;
            $rootScope.device = plataforma.toLowerCase();

        }, false);

        // Rastreia a mudança de rota e coleta o path (ex: /pedido) do navegador
        $rootScope.$on("$locationChangeStart", function (event, next, current) {
            $rootScope.path = $location.path();
        });
    });
})();