const pool = require('../config/db')

const selectCheckout = () => {
  return pool.query('SELECT * FROM checkout')
}

const insertCheckout = ({ orderId, customerId, totalPrice, delivery, payment }) => {
  return pool.query('INSERT INTO checkout(orderId, customerId, totalPrice, delivery, payment)VALUES($1, $2, $3, $4, $5)', [orderId, customerId, totalPrice, delivery, payment])
}

const updateCheckout = ({ orderId, customerId, totalPrice, delivery, payment, id }) => {
  return pool.query('UPDATE checkout SET orderId = $1, customerId = $2, totalPrice = $3, delivery = $4, payment = $5 WHERE id = $6', [orderId, customerId, totalPrice, delivery, payment, id])
}

const deleteCheckout = (id) => {
  return pool.query('DELETE FROM checkout WHERE id = $1', [id])
}

module.exports = {
  selectCheckout,
  insertCheckout,
  updateCheckout,
  deleteCheckout
}
