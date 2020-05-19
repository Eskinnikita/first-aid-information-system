const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const urlencodedParser = bodyParser.urlencoded({extended: false});


const pool = mysql.createPool({
    host: "std-mysql.ist.mospolytech.ru",
    user: "std_272",
    database: "std_272",
    password: "std272mospolytech"
});

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.use(async (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.post('/login', (req, res) => {
    pool.query(
        `SELECT * FROM doctors 
             WHERE firstName='${req.body.firstName}' 
             AND lastName='${req.body.lastName}' 
             AND middleName='${req.body.middleName}'
             AND password='${req.body.password}'
        `,
        function (err, results) {
            if (err) {
                res.status(404).send({message: 'Ошибка авторизации'})
            } else {
                res.status(200).send(results)
            }
        });
})

app.listen(3000, function () {
    console.log("Сервер ожидает подключения...");
});