const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')

const app = express();

const patientsRoutes = require('./routes/patients')
const loginRoutes = require('./routes/login')
const visitsRoutes = require('./routes/visits')
const notesRoutes = require('./routes/notes')
const doctorsRoutes = require('./routes/doctors')
const medicalsRoutes = require('./routes/medical')

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use(cors())

app.use('/login', loginRoutes)
app.use('/patients', patientsRoutes)
app.use('/visits', visitsRoutes)
app.use('/notes', notesRoutes)
app.use('/doctors', doctorsRoutes)
app.use('/medical', medicalsRoutes)

app.listen(8082, function () {
    console.log("Соединение установлено");
});
