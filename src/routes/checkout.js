const express = require('express')
const router = express.Router()
const checkoutController = require('../controller/checkout')

router
  .get('/', checkoutController.getCheckout)
  .post('/', checkoutController.insertCheckout)
  .put('/:id', checkoutController.updateCheckout)
  .delete('/:id', checkoutController.deleteCheckout)

module.exports = router
