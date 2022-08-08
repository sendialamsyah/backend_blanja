const express = require('express')
const router = express.Router()
const categoryController = require('../controller/category')
const { protect, isSeller } = require('../middlewares/auth')

router
  .get('/', categoryController.getCategory)
  .post('/', protect, isSeller, categoryController.insertCategory)
  .put('/:id', protect, isSeller, categoryController.updateCategory)
  .delete('/:id', protect, isSeller, categoryController.deleteCategory)

module.exports = router
