const express = require('express')
const router = express.Router()
const { misDatos, login, registrar } = require('../controllers/usersControllers')

router.get('/datos', misDatos)
router.post('/login', login)
router.post('/', registrar)

module.exports = router