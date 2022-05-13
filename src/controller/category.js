const createError = require('http-errors')
const categoryModels = require('../models/category')
const errServ = new createError.InternalServerError()
const commonHelper = require('../helper/common')

exports.getCategory = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5
    const offset = (page - 1) * limit
    const result = await categoryModels.select({ offset, limit })

    const { rows: [count] } = await categoryModels.countCategory()
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
    next(errServ)
  }
}

exports.insertCategory = async (req, res, next) => {
  try {
    const name = req.body
    await categoryModels.insert(name)
    commonHelper.response(res, name, 201, 'Insert data success')
  } catch (error) {
    next(errServ)
  }
}

exports.updateCategory = async (req, res, next) => {
  try {
    const id = req.params.id
    const name = req.body.name
    const data = {
      id,
      name
    }
    await categoryModels.update(data)
    commonHelper.response(res, data, 200, 'Update data success')
  } catch (error) {
    next(errServ)
  }
}

exports.deleteCategory = async (req, res, next) => {
  try {
    const id = req.params.id
    await categoryModels.deleteCategory(id)
    commonHelper.response(res, id, 200, 'Delete data success')
  } catch (error) {
    next(errServ)
  }
}
