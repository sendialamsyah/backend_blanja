/* eslint-disable camelcase */
const createError = require('http-errors')
const transactionModels = require('../models/transaction')
const errServ = new createError.InternalServerError()
const commonHelper = require('../helper/common')

exports.getTransaction = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 5
    const page = parseInt(req.query.page) || 1
    const offset = (page - 1) * limit

    const userId = req.decoded.id

    const result = await transactionModels.selectTransaction({ limit, offset, userId })

    const { rows: [count] } = await transactionModels.countTransaction(userId)
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

exports.insertTransaction = async (req, res, next) => {
  try {
    const userId = req.decoded.id
    const { checkout_id, address } = req.body

    const data = {
      checkout_id,
      userId,
      address
    }
    await transactionModels.insertTransaction(data)

    commonHelper.response(res, data, 201, 'Insert data success')
  } catch (error) {
    console.log(error)
    next(errServ)
  }
}

exports.updateTransaction = async (req, res, next) => {
  try {
    const id = req.params.id
    const userId = req.decoded.id
    const updated_at = new Date()
    const { checkout_id, address, status } = req.body
    const data = {
      checkout_id,
      userId,
      address,
      status,
      updated_at,
      id
    }
    await transactionModels.update(data)

    commonHelper.response(res, data, 201, 'update data success')
  } catch (error) {
    console.log(error)
    next(errServ)
  }
}

exports.deleteTransaction = async (req, res, next) => {
  try {
    const id = req.params.id
    await transactionModels.deleteTransaction(id)

    commonHelper.response(res, id, 200, 'Delete data success')
  } catch (error) {
    next(errServ)
  }
}
