const express = require('express')
const router = express.Router()
const cartController = require('../controller/cart')
const { protect, isUser } = require('../middlewares/auth')

router
  .get('/', protect, isUser, cartController.getCart)
  .post('/', protect, isUser, cartController.insertCart)
  .put('/:id', protect, isUser, cartController.updateCart)
  .delete('/:id', protect, isUser, cartController.deleteCart)

module.exports = router
