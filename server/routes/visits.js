const express = require('express')
const router = express.Router()
const pool = require('../connection/pool')

router.get('/', (req, res) => {
    pool.query(`SELECT * FROM visits ORDER BY visitDate DESC`,
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

const poolQuery = (query) => {
      return new Promise((resolve, reject) => {
          pool.query(query,
              function (err, results) {
                  if (err) {
                      reject(err)
                  } else {
                      resolve(results)
                  }
              });
      })
}

router.get('/:id',  async (req, res) => {
    try {
        const id = req.params.id
        const visitData = await poolQuery(`SELECT * FROM visits WHERE id=${id}`)
        const patientInfo = await poolQuery(`SELECT firstName,lastName,middleName,groupNum FROM patients WHERE id=${visitData[0].patientId}`)
        const notesInfo = await poolQuery(`SELECT * FROM notes WHERE visitId=${visitData[0].id}`)
        visitData[0].patientInfo = patientInfo[0]
        visitData[0].notes = notesInfo
        res.status(200).send(visitData[0])
    }
    catch(e) {
       res.status(500).send({message: 'Ошибка', status:'error'})
    }
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
