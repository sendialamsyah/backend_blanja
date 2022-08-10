const express = require('express')
const router = express.Router()
const cartController = require('../controller/cart')
const { protect } = require('../middlewares/auth')

router
  .get('/', protect, cartController.getCart)
  .post('/', protect, cartController.insertCart)
  .put('/:id', protect, cartController.updateCart)
  .delete('/:id', protect, cartController.deleteCart)

module.exports = router
