const express = require('express')
const router = express.Router()
const pool = require('../connection/pool')

router.get('/', (req, res) => {
    pool.query(`SELECT * FROM patients`,
        function (err, results) {
            if (err) {
                res.status(500).send({message: 'Ошибка', status: 'error'})
            } else {
                res.status(200).send(results)
            }
        });
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    pool.query(`SELECT * FROM patients WHERE id=${id}`,
        function (err, results) {
            if (err) {
                res.status(500).send({message: 'Ошибка', status: 'error'})
            } else {
                res.status(200).send(results)
            }
        });
})

router.post('/', (req, res) => {
    pool.query(`INSERT INTO patients (medicalPolicy,firstName,lastName,middleName,gender,birthDate,groupNum,phoneNumber)
    VALUES (
    '${req.body.medicalPolicy}', 
    '${req.body.firstName}', 
    '${req.body.lastName}', 
    '${req.body.middleName}', 
    ${req.body.gender}, 
    '${req.body.birthDate}', 
    '${req.body.groupNum}', 
    '${req.body.phoneNumber}')
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
    pool.query(`DELETE FROM patients WHERE id=${id}`,
        function (err, results) {
            if (err) {
                res.status(500).send({message: 'Ошибка удаления', status: 'error'})
            } else {
                res.status(201).send({message: 'Успешно удалено', status: 'success'})
            }
        });
})

router.put('/', (req, res) => {
    pool.query(`UPDATE patients SET
    medicalPolicy='${req.body.medicalPolicy}',
    firstName='${req.body.firstName}', 
    lastName='${req.body.lastName}', 
    middleName='${req.body.middleName}', 
    gender=${req.body.gender}, 
    birthDate='${req.body.birthDate}', 
    groupNum='${req.body.groupNum}', 
    phoneNumber='${req.body.phoneNumber}'
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
