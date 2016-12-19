(function() {
    'use strict';

    angular.module('app',['ngRoute', 'ngCordova', 'ngAnimate'])
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
    .run(function($rootScope, $location){

        $rootScope.device = 'android';

        document.addEventListener("deviceready", function () {
            var plataforma = device.platform;
            $rootScope.device = plataforma.toLowerCase();
        }, false);


        $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {

            $rootScope.transitionClass = "";

            var url_corrente = current.$$route.originalPath;

            if (url_corrente == '/'){

                if (previous){
                    $rootScope.transitionClass = "back";
                }else{
                    $rootScope.transitionClass = "";
                }
            }else{
                $rootScope.transitionClass = "slide";
            }
        });
    });
})();