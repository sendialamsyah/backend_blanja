const express = require('express')
const router = express.Router()
const productController = require('../controller/product')

router
  .get('/', productController.getProduct)
  // .get('/', productController.sortProduct)
  // .get('/', productController.searchProduct)
  .get('/:id', productController.detailProduct)
  .post('/', productController.insertProduct)
  .put('/:id', productController.updateProduct)
  .delete('/:id', productController.deleteProduct)

module.exports = router
