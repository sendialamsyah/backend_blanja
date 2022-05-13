/* eslint-disable camelcase */
const pool = require('../config/db')

const selectOrder = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM order_item', (err, result) => {
      if (!err) {
        resolve(result.rows)
      } else {
        reject(new Error(err))
      }
    })
  })
}

const insertOrder = ({ color, size, quantity, product_id }) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO order_item(color, size, quantity, product_id)VALUES($1, $2, $3, $4)', [color, size, quantity, product_id], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

const updateOrder = ({ color, size, quantity, product_id, id }) => {
  return new Promise((resolve, reject) => {
    pool.query('UPDATE order_item SET COALSESCE(color = $1, size = $2, quantity = $3, product_id = $4) WHERE id = $5 ', [color, size, quantity, product_id, id], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

const deleteOrder = (id) => {
  return new Promise((resolve, reject) => {
    pool.query('DELETE FROM order_item WHERE id = $1', [id], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}
module.exports = {
  selectOrder,
  insertOrder,
  updateOrder,
  deleteOrder
}
