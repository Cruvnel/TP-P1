// Importando o framework express
const express = require("express")
const app = express()

const fs = require('fs')
const path = require('path');

/* CRIAÇÃO DE ROTAS  */

/* Rota para index */
app.get("/", function(require, response){
    response.sendFile(__dirname + "/view/index.html")
})

/* case de rotas */

/* rota de entrada (ver o conteúdo do texto.md) */
app.get("/:link", function(require, response){
    switch(require.params.link){
        case 'entrada':
            const filePath2 = path.join(__dirname, 'entrada/texto.md');
            fs.readFile(filePath2, 'utf-8', (err, texto) => {
            if (err) {
                response.status(404).send('Este arquivo não foi encontrado.');
            } else {
                response.send(texto);
            }
        });
        break;
/* rota para links extraídos do texto.md*/
        case 'links':
            const filePath = path.join(__dirname, 'entrada/texto.md');
            fs.readFile(filePath, 'utf-8', (err, texto) => {
              if (err) {
                response.status(404).send('Este arquivo não foi encontrado.');
              } else {
                const regex = /(https?:\/\/(?:www\.)?youtu\.?be(?:\.com)?\/\S+)/gm;
                const links = texto.match(regex);
                if (links && links.length > 0) {
                    response.send(links.join('<br>'));
                } else {
                    response.send('Arquivo não apresenta link de URL');
                }
              }
            });
        break;
/* rota para a validação se é erro ou não */
        case 'validar':
            const filePath3 = path.join(__dirname, 'entrada/texto.md');
            fs.readFile(filePath3, 'utf-8', (err) => {
            if (err) {
                response.status(404).send('ERRO - status code HTTP 404');
            } else {
                response.status(200).send('VALIDADO -  status code HTTP 200');
            }
            });
        break;
/* rotas divergentes SEMPRE vão dar erro */
        default:
            response.sendFile(__dirname + "/view/erro404.html")
    }
})


module.exports = app;
 

