/* eslint-disable camelcase */
const createError = require('http-errors')
const cartModels = require('../models/cart')
const errServ = new createError.InternalServerError()
const commonHelper = require('../helper/common')

exports.getCart = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 3
    const page = parseInt(req.query.page) || 1
    const offset = (page - 1) * limit

    const user_id = req.decoded.id

    const result = await cartModels.selectCart({ limit, offset, user_id })

    const { rows: [count] } = await cartModels.countCart(user_id)
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

exports.insertCart = async (req, res, next) => {
  try {
    const id = req.decoded.id
    const { product_id, quantity } = req.body

    const data = {
      product_id,
      user_id: id,
      quantity
    }
    await cartModels.insertCart(data)

    commonHelper.response(res, data, 201, 'Insert data success')
  } catch (error) {
    console.log(error)
    next(errServ)
  }
}

exports.updateCart = async (req, res, next) => {
  try {
    const id = req.params.id
    const user_id = req.decoded.id
    const { product_id, quantity } = req.body
    const data = {
      product_id,
      user_id,
      quantity,
      id
    }
    await cartModels.update(data)

    commonHelper.response(res, data, 201, 'update data success')
  } catch (error) {
    console.log(error)
    next(errServ)
  }
}

exports.deleteCart = async (req, res, next) => {
  try {
    const id = req.params.id
    await cartModels.deleteCart(id)

    commonHelper.response(res, id, 200, 'Delete data success')
  } catch (error) {
    next(errServ)
  }
}
