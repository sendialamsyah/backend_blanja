/* eslint-disable camelcase */
const createError = require('http-errors')
const productModels = require('../models/product')
const errServ = new createError.InternalServerError()
const commonHelper = require('../helper/common')

exports.getProduct = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 5
    const page = parseInt(req.query.page) || 1
    const offset = (page - 1) * limit

    const sortby = req.query.sortby || 'price'
    const sort = req.query.sort || 'ASC'

    const search = req.query.search || ''

    const result = await productModels.selectProduct({ limit, offset, sortby, sort, search })

    const { rows: [count] } = await productModels.countProduct()
    const totalData = parseInt(count.total)
    const totalPage = Math.ceil(totalData / limit)

    const pagination = {
      currentPage: page,
      limit,
      totalData,
      totalPage
    }

    commonHelper.response(res, result, 200, 'Get data success', pagination)
  } catch (error) {
    console.log(error)
    next(errServ)
  }
}

exports.detailProduct = async (req, res, next) => {
  try {
    const id = req.params.id
    const result = await productModels.selectProductById(id)

    commonHelper.response(res, result, 200, 'Get data by id success')
  } catch (error) {
    console.log(error)
    next(errServ)
  }
}

exports.insertProduct = async (req, res, next) => {
  try {
    const { name, description, price, stock, category_id } = req.body
    const data = {
      name,
      description,
      price,
      stock,
      category_id
    }
    await productModels.insertProduct(data)

    commonHelper.response(res, data, 201, 'Insert data success')
  } catch (error) {
    next(errServ)
  }
}

exports.updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id
    const { name, description, price, stock, category_id } = req.body
    const data = {
      id,
      name,
      description,
      price,
      stock,
      category_id
    }
    await productModels.updateProduct(data)

    commonHelper.response(res, data, 200, 'Update data success')
  } catch (error) {
    console.log(error)
    next(errServ)
  }
}

exports.deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id
    await productModels.deleteProduct(id)

    commonHelper.response(res, id, 200, 'Delete data success')
  } catch (error) {
    next(errServ)
  }
}
// module.exports = {
//   sortProduct,
//   searchProduct
// }
