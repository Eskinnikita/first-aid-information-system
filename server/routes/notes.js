const express = require('express')
const router = express.Router()
const pool = require('../connection/pool')

router.get('/:id', (req, res) => {
    const id = req.params.id
    pool.query(`SELECT * FROM notes WHERE visitId=${id}`,
        function (err, results) {
            if (err) {
                res.status(500).send({message: 'Ошибка', status: 'error'})
            } else {
                res.status(200).send(results)
            }
        });
})

router.post('/', (req, res) => {
    console.log(req.body)
    pool.query(`INSERT INTO notes (visitId, noteTarget)
    VALUES (
    ${req.body.visitId}, 
    '${req.body.noteTarget}')
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
    pool.query(`DELETE FROM notes WHERE id=${id}`,
        function (err, results) {
            if (err) {
                res.status(500).send({message: 'Ошибка удаления', status: 'error'})
            } else {
                res.status(201).send({message: 'Успешно удалено', status: 'success'})
            }
        });
})

module.exports = router