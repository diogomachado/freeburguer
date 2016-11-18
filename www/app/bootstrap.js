(function() {
    'use strict';

    angular.module('app',['ngRoute', 'ngCordova'])
    .config(function($routeProvider)
    {
        $routeProvider
        .when('/', {
            templateUrl  : 'app/views/home.html',
            controller   : 'HomeController',
            controllerAs : 'Home'
        })
        .when('/pedido', {
            templateUrl  : 'app/views/pedido.html',
            controller   : 'PedidoController',
            controllerAs : 'Pedido'
        })
        .when('/checkout', {
            templateUrl  : 'app/views/checkout.html',
            controller   : 'CheckoutController',
            controllerAs : 'Checkout'
        })
        .otherwise ({ redirectTo: '/' });
    })
    .run(function($rootScope){

        document.addEventListener("deviceready", function () {
            var plataforma = device.platform;
            $rootScope.device = plataforma.toLowerCase();
        }, false);
    });
})();