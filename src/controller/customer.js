const createError = require('http-errors')
const customerModels = require('../models/customer')
const errServ = new createError.InternalServerError()

const getCustomer = (req, res, next) => {
  customerModels.selectCustomer()

    .then((result) => {
      res.status(200).json({
        data: result.rows
      })
    })
    .catch(() => {
      next(errServ)
    })
}

const insertCustomer = (req, res, next) => {
  const { name, address, email, password } = req.body
  const data = {
    name,
    address,
    email,
    password
  }
  customerModels.insertCustomer(data)

    .then(() => {
      res.status(201).json({
        message: 'data berhasil ditambahkan'
      })
    })
    .catch(() => {
      next(errServ)
    })
}

const updateCustomer = (req, res, next) => {
  const id = req.params.id
  const { name, address, email, password } = req.body
  const data = {
    name,
    address,
    email,
    password,
    id
  }
  customerModels.updateCustomer(data)

    .then(() => {
      res.status(200).json({
        message: 'data berhasil diupdate'
      })
    })
    .catch(() => {
      next(errServ)
    })
}

const deleteCustomer = (req, res, next) => {
  const id = req.params.id
  customerModels.deleteCustomer(id)

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
  getCustomer,
  insertCustomer,
  updateCustomer,
  deleteCustomer
}
