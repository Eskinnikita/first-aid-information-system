const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const urlencodedParser = bodyParser.urlencoded({extended: false});

const pool = require('./connection/pool')

const patientsRoutes = require('./routes/patients')
const loginRoutes = require('./routes/login')
const visitsRoutes = require('./routes/visits')
const notesRouters = require('./routes/notes')

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

app.use('/login', loginRoutes)
app.use('/patients', patientsRoutes)
app.use('/visits', visitsRoutes)
app.use('/notes', notesRouters)

app.listen(3000, function () {
    console.log("Соединение установлено");
});