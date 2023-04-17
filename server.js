const app = require('./app.js');

require('dotenv').config({path:'variables.env'});

app.set('port', process.env.port || 7777);
const server = app.listen(app.get('port'),() => {
    console.log("Servidor Rodando na Porta: "+server.address().port);
});