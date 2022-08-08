/* eslint-disable camelcase */
const createError = require('http-errors')
const checkoutModels = require('../models/checkout')
const errServ = new createError.InternalServerError()
const commonHelper = require('../helper/common')

exports.getCheckout = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 5
    const page = parseInt(req.query.page) || 1
    const offset = (page - 1) * limit

    const id_user = req.decoded.id

    const result = await checkoutModels.selectCheckout({ limit, offset, id_user })

    const { rows: [count] } = await checkoutModels.countCheckout(id_user)
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

exports.insertCheckout = async (req, res, next) => {
  try {
    const id_user = req.decoded.id
    const { cart_id, total } = req.body

    const data = {
      cart_id,
      id_user,
      total
    }
    await checkoutModels.insertCheckout(data)

    commonHelper.response(res, data, 201, 'Insert data success')
  } catch (error) {
    console.log(error)
    next(errServ)
  }
}

exports.updateCheckout = async (req, res, next) => {
  try {
    const id = req.params.id
    const id_user = req.decoded.id
    const updated_at = new Date()
    const { cart_id, total } = req.body
    const data = {
      cart_id,
      id_user,
      total,
      updated_at,
      id
    }
    await checkoutModels.update(data)

    commonHelper.response(res, data, 201, 'update data success')
  } catch (error) {
    console.log(error)
    next(errServ)
  }
}

exports.deleteCheckout = async (req, res, next) => {
  try {
    const id = req.params.id
    await checkoutModels.deleteCheckout(id)

    commonHelper.response(res, id, 200, 'Delete data success')
  } catch (error) {
    next(errServ)
  }
}
