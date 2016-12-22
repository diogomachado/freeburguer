(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    // Dependencias
    HomeController.$injector = ['$scope', '$location'];

    function HomeController($scope, $location){

        this.scanear = function(){

            // TODO: Se tiver logado, vai para a empresa, senão pede scanner
            cordova.plugins.barcodeScanner.scan(
              function (result) {

                    // Tudo certo, busta no Firebase
                    // ...

                    alert("We got a barcode\n" +
                        "Result: " + result.text + "\n" +
                        "Format: " + result.format + "\n" +
                        "Cancelled: " + result.cancelled);
              },
              function (error) {
                  alert("Scanning failed: " + error);
              }
            );

        }

        this.encontrar = function(){

            var uid = $scope.uid_empresa;

            var db = firebase.database();
            var empresas = db.ref('empresas');

            var query = empresas
                        .orderByChild('uid')
                        .equalTo(uid)
                        .limitToFirst(1);

            query.on('value', function(snapshot){

                if (snapshot.val()){

                    var empresa = snapshot.val();

                    var keys = Object.keys(empresa);

                    $location.path('pedido/' + keys[0]);

                }else{
                    console.warn("Nenhuma empresa com esse ID.");
                }
            });
        }
    }

})();