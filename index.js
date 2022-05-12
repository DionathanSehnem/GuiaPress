const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database.js');
const routes = require('./routes/index.js');
const session = require('express-session');
const bcrypt = require('bcryptjs');

app.set('view engine', 'ejs');

//Configuring session
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync('guiapress', salt);
app.use(session({
    secret: hash,
    cookie: { maxAge: 30 * 60 * 1000 } // minutos * segundos * milésimos
}))

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