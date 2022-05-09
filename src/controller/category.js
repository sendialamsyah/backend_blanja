const createError = require('http-errors')
const categoryModels = require('../models/category')
const errServ = new createError.InternalServerError()

const getCategory = (req, res, next) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 5
  const offset = (page - 1) * limit
  categoryModels.select({ offset, limit })

  // const categoryModels.countCategory()
  // const totalData = parseInt(count.total)
  // const totalPage = Math.ceil(totalData / limit)

    .then((result) => {
      res.status(200).json({
      //   pagination: {
      //     currentPage: page,
      //     limit,
      //     totalData,
      //     totalPage
      //   },
        data: result.rows
      })
    })
    .catch(() => {
      next(errServ)
    })
}

const insertCategory = (req, res, next) => {
  const name = req.body
  categoryModels.insert(name)

    .then(() => {
      res.status(201).json({
        message: 'data berhasil ditambahkan'
      })
    })
    .catch(() => {
      next(errServ)
    })
}

const updateCategory = (req, res, next) => {
  const id = req.params.id
  const name = req.body.name
  const data = {
    id,
    name
  }
  categoryModels.update(data)

    .then(() => {
      res.status(200).json({
        message: 'data berhasil diupdate'
      })
    })
    .catch(() => {
      next(errServ)
    })
}

const deleteCategory = (req, res, next) => {
  const id = req.params.id
  categoryModels.deleteCategory(id)

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
  getCategory,
  insertCategory,
  updateCategory,
  deleteCategory
}
