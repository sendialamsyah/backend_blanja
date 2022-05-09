require('dotenv').config()
const express = require('express')
const cors = require('cors')
const createError = require('http-errors')
const morgan = require('morgan')
const helmet = require('helmet')

const categoryRouter = require('./src/routes/category')
const productRouter = require('./src/routes/product')
const orderRouter = require('./src/routes/order')
const sellerRourter = require('./src/routes/seller')
const customerRouter = require('./src/routes/customer')
const checkoutRouter = require('./src/routes/checkout')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(helmet())

app.use('/product', productRouter)
app.use('/category', categoryRouter)
app.use('/order', orderRouter)
app.use('/seller', sellerRourter)
app.use('/customer', customerRouter)
app.use('/checkout', checkoutRouter)

app.all('*', (req, res, next) => {
  next(new createError.NotFound())
})

app.use((err, req, res, next) => {
  const messError = err.message || 'internal server error'
  const statusCode = err.status || 500

  res.status(statusCode).json({
    message: messError
  })
})

app.listen(PORT, () => {
  console.log(`Server starting on port ${PORT}`)
})
