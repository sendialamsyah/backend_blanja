const express = require('express')
const router = express.Router()
const transactionController = require('../controller/transaction')
const { protect } = require('../middlewares/auth')

router
  .get('/', protect, transactionController.getTransaction)
  .post('/', protect, transactionController.insertTransaction)
  .put('/:id', protect, transactionController.updateTransaction)
  .delete('/:id', protect, transactionController.deleteTransaction)

module.exports = router
