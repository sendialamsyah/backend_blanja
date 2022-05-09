const createError = require('http-errors')
const orderModels = require('../models/order')
const errServ = createError.InternalServerError()

const getOrder = (req, res, next) => {
  orderModels.selectOrder()

    .then((result) => {
      res.status(200).json({
        data: result.rows
      })
    })
    .catch(() => {
      next(errServ)
    })
}

const insertOrder = (req, res, next) => {
  const { color, size, quantity, productId } = req.body
  const data = {
    color,
    size,
    quantity,
    productId
  }
  orderModels.insertOrder(data)

    .then(() => {
      res.status(201).json({
        message: 'data berhasil ditambahkan'
      })
    })
    .catch(() => {
      next(errServ)
    })
}

const updateOrder = (req, res, next) => {
  const id = req.params.id
  const { color, size, quantity, productId } = req.body
  const data = {
    color,
    size,
    quantity,
    productId,
    id
  }
  orderModels.updateOrder(data)
    .then(() => {
      res.status(200).json({
        message: 'data berhasil diupdate'
      })
    })
    .catch(() => {
      next(errServ)
    })
}

const deleteOrder = (req, res, next) => {
  const id = req.params.id
  orderModels.deleteOrder(id)

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
  getOrder,
  insertOrder,
  updateOrder,
  deleteOrder
}
