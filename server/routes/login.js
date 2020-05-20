const express = require('express')
const router = express.Router()
const pool = require('../connection/pool')

router.post('/', (req, res) => {
    pool.query(
        `SELECT * FROM doctors 
             WHERE firstName='${req.body.firstName}' 
             AND lastName='${req.body.lastName}' 
             AND middleName='${req.body.middleName}'
             AND password='${req.body.password}'
        `,
        function (err, results) {
            if (err) {
                res.status(500).send({message: 'Ошибка авторизации', status: 'error'})
            } else {
                res.status(200).send(results)
            }
        });
})

module.exports = router
