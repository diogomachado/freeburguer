(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$injector = ['$scope', '$location'];

    function HomeController($scope, $location){

        // Faz a leitura do QRcode
        this.scanear = function(){

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
            encontrar($scope.uid_empresa);
        }

        // Realiza a busca na plataforma Firebase
        function encontrar(uid){

            // Inicializa
            var db = firebase.database();

            // Busca a referencia, entenda como uma URL, empresas no Firebase é representando por /empresas
            var empresas = db.ref('empresas');

            // Prepara a busca filtrando
            var query = empresas
                        .orderByChild('uid')
                        .equalTo(uid)
                        .limitToFirst(1);

            query.on('value', function(snapshot){

                if (snapshot.val()){

                    var empresa = snapshot.val();

                    var keys = Object.keys(empresa);

                    $location.path('cardapio/' + keys[0]);

                    $scope.$apply();

                }else{
                    alert("Nenhuma empresa com esse ID.");
                }
            });
        }
    }

})();