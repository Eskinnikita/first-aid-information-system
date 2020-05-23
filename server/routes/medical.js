const express = require('express')
const router = express.Router()
const pool = require('../connection/pool')

router.get('/', (req, res) => {
    pool.query(`SELECT * FROM medicalSupplies`,
        function (err, results) {
            if (err) {
                res.status(500).send({message: 'Ошибка', status: 'error'})
            } else {
                res.status(200).send(results)
            }
        });
})

router.post('/', (req, res) => {
    pool.query(`INSERT INTO medicalSupplies (name,quantity,availableQuantity)
    VALUES (
    '${req.body.name}', 
    ${req.body.quantity},
    ${req.body.availableQuantity})
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
    pool.query(`DELETE FROM medicalSupplies WHERE id=${id}`,
        function (err, results) {
            if (err) {
                res.status(500).send({message: 'Ошибка удаления', status: 'error'})
            } else {
                res.status(201).send({message: 'Успешно удалено', status: 'success'})
            }
        });
})
//
router.get('/:id', (req, res) => {
    const id = req.params.id
    pool.query(`SELECT * FROM medicalSupplies WHERE id=${id}`,
        function (err, results) {
            if (err) {
                res.status(500).send({message: 'Ошибка удаления', status: 'error'})
            } else {
                res.status(201).send(results[0])
            }
        });
})
//
router.put('/', (req, res) => {
    console.log(req.body)
    pool.query(`UPDATE medicalSupplies SET
    name='${req.body.name}',
    quantity=${req.body.quantity},
    availableQuantity=${req.body.availableQuantity}
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