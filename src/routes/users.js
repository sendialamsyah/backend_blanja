const express = require('express')
const router = express.Router()
const { register, login } = require('../controller/users')

router
  .post('/register', register)
  .post('/login', login)

module.exports = router
