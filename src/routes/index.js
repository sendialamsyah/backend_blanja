const express = require('express')
const router = express.Router()
const categoryRouter = require('./category')
const productRouter = require('./product')
const orderRouter = require('./checkout')
const usersRouter = require('./auth/users')
const cartRouter = require('./cart.js')

router
  .use('/product', productRouter)
  .use('/category', categoryRouter)
  .use('/checkout', orderRouter)
  .use('/users', usersRouter)
  .use('/cart', cartRouter)
module.exports = router
