(function() {
    'use strict';

    angular.module('app',['ngRoute', 'ngCordova', 'ngAnimate', 'firebase'])
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
            templateUrl  : 'app/views/pedido-busca.html',
            controller   : 'PedidoBuscaController',
            controllerAs : 'PedidoBusca'
        })
        // Rota para ver informações de um pedido
        .when('/pedido-info/:id_pedido', {
            templateUrl  : 'app/views/pedido-info.html',
            controller   : 'PedidoInfoController',
            controllerAs : 'PedidoInfo'
        })
        .otherwise ({ redirectTo: '/' });
    })
    .run(function($rootScope, $location, $cordovaDialogs, $timeout){

        // TODO: remover ao lançar
        $rootScope.device = 'android';

        document.addEventListener("deviceready", function () {

            // Identifica a plataforma (ios|android)
            var plataforma = device.platform;
            $rootScope.device = plataforma.toLowerCase();

        }, false);

        $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
            $rootScope.online = true;
            console.log("Online");
        });

        $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
            $rootScope.online = false;
            $rootScope.alertaOnline = true;
            console.log("Offline");
        });

        $rootScope.$watch('online', function(){
            if ($rootScope.online){
                $rootScope.alertaOnline = true;
                $timeout(function(){
                    $rootScope.alertaOnline = false;
                }, 3000)
            }
        });

        $rootScope.sair = function(){

            $cordovaDialogs.confirm("Tem certeza que deseja sair?", "Atenção", ['Sim','Não'])
            .then(function(buttonIndex) {

                // 'OK' = 1, 'Cancel' = 2
                if (buttonIndex == 1){

                    var exp = /(cardapio)/ig;
                    var location = window.location.hash;

                    if (location.search(exp) != -1){

                        // Variavel de apoio
                        var back = {};

                        // Gravo a ID do firebase da casa de hamburgueres
                        back.casa_id = sessionStorage.getItem('freeburguer-id');

                        // Gravo os itens até então selecionados
                        back.casa_itens = sessionStorage.getItem('freeburguer-itens');

                        // Grava no localStorage
                        localStorage.setItem('freeburguer-back', JSON.stringify(back));
                    }

                    // Sai do app
                    navigator.app.exitApp();
                }
            });
        }

        // Rastreia a mudança de rota e coleta o path (ex: /pedido) do navegador
        $rootScope.$on("$locationChangeStart", function (event, next, current) {
            $rootScope.path = $location.path();
        });
    });
})();