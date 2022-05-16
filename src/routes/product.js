const express = require('express')
const router = express.Router()
const upload = require('../middlewares/upload')
const productController = require('../controller/product')
const { protect, isAdmin } = require('../middlewares/auth')
// const { hitCacheProductDetail, clearCacheProductDetail } = require('../middlewares/redis')

router
  .get('/', productController.getProduct)
  .get('/:id', productController.detailProduct)
  .post('/', protect, isAdmin, upload.single('photo'), productController.insertProduct)
  .put('/:id', protect, isAdmin, productController.updateProduct)
  .delete('/:id', protect, isAdmin, productController.deleteProduct)

module.exports = router
