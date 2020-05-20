const express = require('express')
const router = express.Router()
const pool = require('../connection/pool')

router.get('/', (req, res) => {
    pool.query(`SELECT * FROM visits`,
        function (err, results) {
            if (err) {
                res.status(500).send({message: 'Ошибка', status: 'error'})
            } else {
                res.status(200).send(results)
            }
        });
})

router.post('/', (req, res) => {
    pool.query(`INSERT INTO visits (patientId,doctorId,title,visitDate,complaint,diagnosis)
    VALUES (
    '${req.body.patientId}', 
    '${req.body.doctorId}', 
    '${req.body.title}', 
    '${req.body.visitDate}', 
    '${req.body.complaint}', 
    '${req.body.diagnosis}')
    `,
        function (err, results) {
            if (err) {
                res.status(500).send({message: 'Ошибка добавления', status: 'error'})
            } else {
                res.status(200).send({message: 'Успешно добавлено', status: 'success'})
            }
        });
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    pool.query(`SELECT * FROM visits WHERE id=${id}`,
        function (err, results) {
            if (err) {
                res.status(500).send({message: 'Ошибка', status: 'error'})
            } else {
                const visit = results[0]
                pool.query(`SELECT * FROM patients WHERE id=${visit.patientId}`,
                    function (err, patient) {
                        if (err) {
                            res.status(500).send({message: 'Ошибка', status: 'error'})
                        } else {
                            visit.patientInfo = patient[0]
                            res.status(200).send(visit)
                        }
                    });
            }
        });
})

router.put('/', (req, res) => {
    pool.query(`UPDATE visits SET
    patientId='${req.body.patientId}', 
    doctorId='${req.body.doctorId}',
    title='${req.body.title}', 
    visitDate='${req.body.visitDate}',
    complaint='${req.body.complaint}', 
    diagnosis='${req.body.diagnosis}'
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

router.delete('/:id', (req, res) => {
    const id = req.params.id
    pool.query(`DELETE FROM visits WHERE id=${id}`,
        function (err, results) {
            if (err) {
                res.status(500).send({message: 'Ошибка удаления', status: 'error'})
            } else {
                res.status(201).send({message: 'Успешно удалено', status: 'success'})
            }
        });
})

module.exports = router
