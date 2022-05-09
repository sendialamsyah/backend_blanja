const express = require('express')
const router = express.Router()
const selectController = require('../controller/seller')

router
  .get('/', selectController.getSeller)
  .post('/', selectController.insertSeller)
  .put('/:id', selectController.updateSeller)
  .delete('/:id', selectController.deleteSeller)

module.exports = router
