const express = require('express')
const router = express.Router()
const customerController = require('../controller/customer')

router
  .get('/', customerController.getCustomer)
  .post('/', customerController.insertCustomer)
  .put('/:id', customerController.updateCustomer)
  .delete('/:id', customerController.deleteCustomer)

module.exports = router
