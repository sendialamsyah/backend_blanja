const validate = (req, res, next) => {
  const stock = req.body.stock

  if (stock < 1) {
    res.json({
      message: 'stock tidak boleh 0'
    })
    return
  }
  next()
}

module.exports = {
  validate
}
