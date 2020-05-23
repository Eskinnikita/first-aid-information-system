const express = require('express')
const router = express.Router()
const pool = require('../connection/pool')

router.get('/', (req, res) => {
    pool.query(`SELECT * FROM doctors`,
        function (err, results) {
            if (err) {
                res.status(500).send({message: 'Ошибка', status: 'error'})
            } else {
                res.status(200).send(results)
            }
        });
})

router.post('/', (req, res) => {
    pool.query(`INSERT INTO doctors (firstName,lastName,middleName, password, phoneNumber, isAdmin)
    VALUES (
    '${req.body.firstName}', 
    '${req.body.lastName}', 
    '${req.body.middleName}', 
    '${req.body.password}', 
    '${req.body.phoneNumber}',
     ${req.body.isAdmin})
    `,
        function (err, results) {
            if (err) {
                res.status(500).send({message: 'Ошибка добавления', status: 'error'})
            } else {
                res.status(200).send({message: 'Успешно добавлено', status: 'success'})
            }
        });
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    pool.query(`DELETE FROM doctors WHERE id=${id}`,
        function (err, results) {
            if (err) {
                res.status(500).send({message: 'Ошибка удаления', status: 'error'})
            } else {
                res.status(201).send({message: 'Успешно удалено', status: 'success'})
            }
        });
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    pool.query(`SELECT * FROM doctors WHERE id=${id}`,
        function (err, results) {
            if (err) {
                res.status(500).send({message: 'Ошибка удаления', status: 'error'})
            } else {
                res.status(201).send(results[0])
            }
        });
})

router.put('/', (req, res) => {
    pool.query(`UPDATE doctors SET
    firstName='${req.body.firstName}', 
    lastName='${req.body.lastName}', 
    middleName='${req.body.middleName}', 
    password='${req.body.password}', 
    phoneNumber='${req.body.phoneNumber}', 
    isAdmin=${req.body.isAdmin}
    WHERE id=${req.body.id}
    `,
        function (err, results) {
            if (err) {
                res.status(500).send({message: 'Ошибка обновления', status: 'error'})
            } else {
                res.status(200).send({message: 'Успешно обновлено', status: 'success'})
            }
        });
})

module.exports = router