const pool = require('../config/db')

const selectOrder = () => {
  return pool.query('SELECT * FROM order_item')
}

const insertOrder = ({ color, size, quantity, productId }) => {
  return pool.query('INSERT INTO order_item(color, size, quantity, productId)VALUES($1, $2, $3, $4)', [color, size, quantity, productId])
}

const updateOrder = ({ color, size, quantity, productId, id }) => {
  return pool.query('UPDATE order_item SET color = $1, size = $2, quantity = $3, productId = $4 WHERE id = $5 ', [color, size, quantity, productId, id])
}

const deleteOrder = (id) => {
  return pool.query('DELETE FROM order_item WHERE id = $1', [id])
}
module.exports = {
  selectOrder,
  insertOrder,
  updateOrder,
  deleteOrder
}
