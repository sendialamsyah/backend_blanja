const createError = require('http-errors')
const checkoutModule = require('../models/checkout')
const errServ = new createError.InternalServerError()

const getCheckout = (req, res, next) => [
  checkoutModule.selectCheckout()

    .then((result) => {
      res.status(200).json({
        data: result.rows
      })
    })
    .catch(() => {
      next(errServ)
    })
]

const insertCheckout = (req, res, next) => {
  const { orderId, customerId, totalPrice, delivery, payment } = req.body
  const data = {
    orderId,
    customerId,
    totalPrice,
    delivery,
    payment
  }
  checkoutModule.insertCheckout(data)

    .then(() => {
      res.status(201).json({
        message: 'data berhasil ditambahkan'
      })
    })
    .catch(() => {
      next(errServ)
    })
}

const updateCheckout = (req, res, next) => {
  const id = req.params.id
  const { orderId, customerId, totalPrice, delivery, payment } = req.body
  const data = {
    orderId,
    customerId,
    totalPrice,
    delivery,
    payment,
    id
  }
  checkoutModule.updateCheckout(data)

    .then(() => {
      res.status(200).json({
        message: 'data berhasil diupdate'
      })
    })
    .catch(() => {
      next(errServ)
    })
}

const deleteCheckout = (req, res, next) => {
  const id = req.params.id
  checkoutModule.deleteCheckout(id)

    .then(() => {
      res.status(200).json({
        message: 'data berhasil dihapus'
      })
    })
    .catch(() => {
      next(errServ)
    })
}

module.exports = {
  getCheckout,
  insertCheckout,
  updateCheckout,
  deleteCheckout
}
