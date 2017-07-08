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

            var nova_chave = firebase.database().ref().child(url).push().key;
            var data = {};

            data[url + nova_chave] = objeto;

            firebase.database().ref().update(data);

            return nova_chave;
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