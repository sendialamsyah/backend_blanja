const express = require('express')
const router = express.Router()
const categoryRouter = require('./category')
const productRouter = require('./product')
const orderRouter = require('./order')
const usersRouter = require('./users')

router
  .use('/product', productRouter)
  .use('/category', categoryRouter)
  .use('/order', orderRouter)
  .use('/users', usersRouter)

module.exports = router
