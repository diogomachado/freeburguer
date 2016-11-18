(function() {
    'use strict';

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
            controller   : 'PedidoController',
            controllerAs : 'Pedido'
        })
        .when('/checkout', {
            templateUrl  : 'app/views/checkout.html',
        })
        .otherwise ({ redirectTo: '/' });
    })
    .run(function($rootScope){

        $rootScope.device = "ios";

        // Inicializa o cordova
        document.addEventListener("deviceready", function () {
            console.info("Cordova inicializado com sucesso.");

            var plataforma = device.platform;
            // $rootScope.device = plataforma.toLowerCase();
        }, false);
    });

})();