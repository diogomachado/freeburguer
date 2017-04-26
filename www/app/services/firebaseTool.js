(function() {
    angular.module('app').factory('firebaseTool', firebaseTool);

    function firebaseTool(){

        var service = {};

        /**
          * Cria um novo objeto na base de dados
          *
          * O parâmetro URL recebe a URL da base, exemplo: 'empresas/fotos/';
          * O parâmetro OBJETO é o valor que será atribuido a linha, pode ser uma string, número ou objeto;
          */
        service.create = function(url, objeto){

            console.log(url);

            var new_key = firebase.database().ref().child(url).push().key;

            var new_data = {};

            new_data[url + new_key] = objeto;

            console.log(new_data);

            console.log(firebase.database().ref().update(new_data));

            return new_key;
        }

        /**
          * Cria/atualiza um path simples com o objeto
          *
          */
        service.set = function(url, objeto){
            firebase.database().ref(url).set(objeto);
        }

        return service;
    }
})();