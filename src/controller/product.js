/* eslint-disable camelcase */
const createError = require('http-errors')
const productModels = require('../models/product')
const errServ = new createError.InternalServerError()
const commonHelper = require('../helper/common')
// const client = require('../config/redis')
const cloudinary = require('../helper/cloudinary')

exports.getProduct = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 1
    const page = parseInt(req.query.page) || 1
    const offset = (page - 1) * limit

    const sortby = req.query.sortby || 'id'
    const sort = req.query.sort || ''

    const search = req.query.search || ''

    const result = await productModels.selectProduct({ limit, offset, sortby, sort, search })

    const { rows: [count] } = await productModels.countProduct()
    const totalData = parseInt(count.total)
    const totalPage = Math.ceil(totalData / limit)

    const pagination = {
      currentPage: page,
      limit,
      totalData,
      totalPage,
      username: req.payload
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
    const { rows: [product] } = await productModels.selectProductById(id)
    // client.setEx(`product/${id}`, 60 * 60, JSON.stringify(product))

    commonHelper.response(res, product, 200, 'Get data from database')
  } catch (error) {
    console.log(error)
    next(errServ)
  }
}

exports.insertProduct = async (req, res, next) => {
  try {
    const { name, description, price, stock, category_id } = req.body
    const img = req.file.path
    const ress = await cloudinary.uploader.upload(img, {
      folder: 'blanja'
    })

    const data = {
      name,
      description,
      price,
      stock,
      // photo: `${req.get('host')}/img/${req.file.filename}`,
      photo: ress.url,
      category_id: category_id || 1
    }
    await productModels.insertProduct(data)

    commonHelper.response(res, data, 201, 'Insert data success')
  } catch (error) {
    console.log(error)
    next(errServ)
  }
}

exports.updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id
    const { name, description, price, stock, category_id } = req.body
    console.log(req.file)
    const img = req.file.path
    const ress = await cloudinary.uploader.upload(img, {
      folder: 'blanja'
    })

    const data = {
      id,
      name,
      description,
      price,
      stock,
      // photo: `${req.get('host')}/img/${req.file.filename}`,
      photo: ress.url,
      category_id
    }
    await productModels.update(data)

    commonHelper.response(res, data, 201, 'update data success')
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
