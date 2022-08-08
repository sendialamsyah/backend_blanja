const express = require('express')
const router = express.Router()
const checkoutController = require('../controller/checkout')
const { protect, isUser } = require('../middlewares/auth')

router
  .get('/', protect, isUser, checkoutController.getCheckout)
  .post('/', protect, isUser, checkoutController.insertCheckout)
  .put('/:id', protect, isUser, checkoutController.updateCheckout)
  .delete('/:id', protect, isUser, checkoutController.deleteCheckout)

module.exports = router
