(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    // Dependencias
    HomeController.$injector = ['$scope'];

    function HomeController($scope){

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
    }

})();