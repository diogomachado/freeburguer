(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$injector = ['$scope', '$rootScope', '$location', '$timeout'];

    function HomeController($scope, $rootScope, $location, $timeout){

        // Se sabemos que ele saiu no meio de um pedido
        var voltar = localStorage.getItem('freeburguer-back');

        if (voltar){

            voltar = JSON.parse(voltar);

            $timeout(function(){
                $cordovaDialogs.confirm("Você estava escolhendo seu pedido da última vez que saiu, deseja voltar a seleção?", "Deseja continuar...", ['Sim','Não'])
                .then(function(buttonIndex) {
                    if (buttonIndex == 1){
                        encontrar(voltar.casa_id);

                        // TODO: Seleciona novamente os itens já selecionados antes
                        // ...

                        // Remove
                        localStorage.removeItem('freeburguer-back');
                    }
                });
            }, 600);
        }

        // Faz a leitura do QRcode
        this.scanear = function(){

            $rootScope.carregar = true;

            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    encontrar(result.text);
                },
                function (error) {
                    console.error("Erro ao scanear qrcode: " + error);
                }
            );
        }

        // Faz a busca ao tocar no button buscar
        this.buscar = function(){

            $rootScope.carregar = true;

            encontrar($scope.codigo_empresa);
        }

        // Realiza a busca na plataforma Firebase
        function encontrar(codigo){

            // Inicializa
            var db = firebase.database();
            var empresas = db.ref('empresas');

            // Prepara a busca filtrando
            var query = empresas
                        .orderByChild('codigo')
                        .equalTo(codigo)
                        .limitToFirst(1);

            query.on('value', function(snapshot){

                if (snapshot.val()){

                    var empresa = snapshot.val();

                    var keys = Object.keys(empresa);

                    $location.path('cardapio/' + keys[0]);

                    // Guarda a ID da empresa em sessão
                    sessionStorage.setItem('freeburguer-id', codigo);

                    $rootScope.carregar = false;

                    $scope.$apply();

                }else{

                    $rootScope.carregar = false;
                    $scope.$apply();

                    $cordovaVibration.vibrate(100);
                    $cordovaDialogs.alert('Nenhuma empresa com esse ID.', 'Ops :(', 'Beleza')
                    .then(function() {
                      // callback success
                    });
                }
            });
        }

        this.pingar = function(){
            var element = document.querySelector('#ketchup');
            element.setAttribute("class", "pingar");
        }
    }

})();