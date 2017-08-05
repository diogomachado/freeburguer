#!/usr/bin/env node

var del  = require('del');
var fs   = require('fs');
var path = require('path');

// Coleta a plataforma
var platform = process.argv[3];

// Diretório para excluir
var diretorio = 'platforms/android/assets/www/bower_components/';

function verificarDiretorio(diretorio, expressaoRegular, callback){

    if (!fs.existsSync(diretorio)){
        console.log("Diretório não encontrado: ",diretorio);
        return;
    }

    // Captura os arquivos
    var files=fs.readdirSync(diretorio);

    // Percorre os arquivos
    for(var i=0; i < files.length; i++){

        // Captura o caminho do arquivo
        var caminhoArquivo = path.join(diretorio,files[i]);

        var verificador = fs.lstatSync(caminhoArquivo);

        if (verificador.isDirectory()){
            // Recursividade
            verificarDiretorio(caminhoArquivo, expressaoRegular, callback);
        }
        // Se não encontrou as expressão, retorna o arquivo
        else if (!expressaoRegular.test(caminhoArquivo)){
            callback(caminhoArquivo);
        }
    };
};

// Se pasta existe
if(fs.existsSync(diretorio)){
	console.log('Removendo pasta...');

    // Procura dentro do diretório arquivos desnecessários
    verificarDiretorio(diretorio, /(\.min.js|\.min.css|\.css)$/, function(caminhoArquivo){
        fs.unlink(caminhoArquivo);
    });

    // Deleta diretório
	// del.sync(diretorio);
}else{
	console.log('Diretório não encontrado');
}