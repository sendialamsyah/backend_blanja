const createError = require('http-errors')
const sellerModel = require('../models/seller')
const errServ = new createError.InternalServerError()

const getSeller = (req, res, next) => {
  sellerModel.selectSeller()

    .then((result) => {
      res.status(200).json({
        data: result.rows
      })
    })
    .catch(() => {
      next(errServ)
    })
}

const insertSeller = (req, res, next) => {
  const { name, storeName, email, password } = req.body
  const data = {
    name,
    storeName,
    email,
    password
  }
  sellerModel.insertSeller(data)
    .then(() => {
      res.status(201).json({
        message: 'data berhasil ditambahkan'
      })
    })
    .catch(() => {
      next(errServ)
    })
}

const updateSeller = (req, res, next) => {
  const id = req.params.id
  const { name, storeName, email, password } = req.body
  const data = {
    name,
    storeName,
    email,
    password,
    id
  }
  sellerModel.updateSeller(data)

    .then(() => {
      res.status(200).json({
        message: 'data berhasil duipdate'
      })
    })
    .catch(() => {
      next(errServ)
    })
}

const deleteSeller = (req, res, next) => {
  const id = req.params.id
  sellerModel.deleteSeller(id)

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
  getSeller,
  insertSeller,
  updateSeller,
  deleteSeller
}
