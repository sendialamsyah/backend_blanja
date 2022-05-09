const express = require('express')
const router = express.Router()
const orderController = require('../controller/order')

router
  .get('/', orderController.getOrder)
  .post('/', orderController.insertOrder)
  .put('/:id', orderController.updateOrder)
  .delete('/:id', orderController.deleteOrder)

module.exports = router
