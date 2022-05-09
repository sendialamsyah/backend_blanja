const createError = require('http-errors')
const productModels = require('../models/product')
const errServ = new createError.InternalServerError()

const getProduct = (req, res, next) => {
  productModels.selectProduct()
    .then((result) => {
      res.status(200).json({
        data: result.rows
      })
    })
    .catch(() => {
      next(errServ)
    })
}

const sortProduct = (req, res, next) => {
  const sortby = req.query.sortby
  const sort = req.query.sort

  const limit = parseInt(req.query.limit)
  const page = parseInt(req.query.page)
  const offset = (page - 1) * limit

  productModels.sortProduct({ sortby, sort, limit, offset })

    .then((result) => {
      res.status(200).json({
        data: result.rows
      })
    })
    .catch((error) => {
      console.log(error)
      next(errServ)
    })
}

const searchProduct = (req, res, next) => {
  const search = req.query.search
  productModels.searchProduct(search)

    .then((result) => {
      res.status(200).json({
        data: result.rows
      })
    })
    .catch(() => {
      next(errServ)
    })
}

const detailProduct = (req, res, next) => {
  const id = req.params.id
  productModels.selectProductById(id)

    .then((result) => {
      res.status(200).json({
        data: result.rows
      })
    })
    .catch(() => {
      next(errServ)
    })
}

const insertProduct = (req, res, next) => {
  const { name, description, price, stock, categoryId, sellerId } = req.body
  const data = {
    name,
    description,
    price,
    stock,
    categoryId,
    sellerId
  }
  productModels.insertProduct(data)
    .then(() => {
      res.status(201).json({
        message: 'data berhasil ditambahkan'
      })
    })
    .catch(() => {
      next(errServ)
    })
}

const updateProduct = (req, res, next) => {
  const id = req.params.id
  const { name, description, price, stock, categoryId, sellerId } = req.body
  const data = {
    name,
    description,
    price,
    stock,
    categoryId,
    sellerId,
    id
  }
  productModels.updateProduct(data)
    .then(() => {
      res.status(200).json({
        message: 'data berhasil diupdate'
      })
    })
    .catch(() => {
      next(errServ)
    })
}

const deleteProduct = (req, res, next) => {
  const id = req.params.id
  productModels.deleteProduct(id)

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
  getProduct,
  detailProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
  sortProduct,
  searchProduct
}
