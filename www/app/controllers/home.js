(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    // Dependencias
    HomeController.$injector = ['$scope', '$location'];

    function HomeController($scope, $location){


        // angular.element(document.querySelector('.swiper')).css('display', 'block');
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            paginationType: 'progress',
        });

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

        this.buscar = function(){
            encontrar($scope.uid_empresa);
        }

        function encontrar(uid){

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
                    $scope.$apply();

                }else{
                    alert("Nenhuma empresa com esse ID.");
                }
            });
        }
    }

})();