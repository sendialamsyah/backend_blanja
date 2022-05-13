const express = require('express')
const router = express.Router()
const productController = require('../controller/product')

router
  .get('/', productController.getProduct)
  .get('/:id', productController.detailProduct)
  .post('/', productController.insertProduct)
  .put('/:id', productController.updateProduct)
  .delete('/:id', productController.deleteProduct)

module.exports = router
