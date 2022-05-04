const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database.js');
const routes = require('./routes/index.js');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
routes(app)

connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso!");
    }).catch((err) => {
        console.log(err);
    })


app.listen(3000, () => {
    console.log('Servidor rodando!')
})