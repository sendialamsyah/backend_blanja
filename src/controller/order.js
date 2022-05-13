/* eslint-disable camelcase */
const createError = require('http-errors')
const orderModels = require('../models/order')
const errServ = createError.InternalServerError()
const commonHelper = require('../helper/common')

exports.getOrder = async (req, res, next) => {
  try {
    const result = await orderModels.selectOrder()

    commonHelper.response(res, result, 200, 'Get data success')
  } catch (error) {
    next(errServ)
  }
}

exports.insertOrder = async (req, res, next) => {
  try {
    const { color, size, quantity, product_id } = req.body
    const data = {
      color,
      size,
      quantity,
      product_id
    }
    await orderModels.insertOrder(data)

    commonHelper.response(res, data, 201, 'Insert data success')
  } catch (error) {
    next(errServ)
  }
}

exports.updateOrder = async (req, res, next) => {
  try {
    const id = req.params.id
    const { color, size, quantity, product_id } = req.body
    const data = {
      color,
      size,
      quantity,
      product_id,
      id
    }
    await orderModels.updateOrder(data)

    commonHelper.response(res, data, 200, 'Update data success')
  } catch (error) {
    next(errServ)
  }
}

exports.deleteOrder = async (req, res, next) => {
  try {
    const id = req.params.id
    await orderModels.deleteOrder(id)

    commonHelper.response(res, id, 200, 'Delete data success')
  } catch (error) {
    next(errServ)
  }
}
