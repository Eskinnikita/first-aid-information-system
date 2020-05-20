const mysql = require("mysql2");
const pool = mysql.createPool({
    host: "std-mysql.ist.mospolytech.ru",
    user: "std_272",
    database: "std_272",
    password: "std272mospolytech"
});

module.exports = pool

