/* eslint-disable camelcase */
const pool = require('../config/db')

const selectCart = ({ limit, offset, user_id, sortby, sort }) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT carts.*, product.name as product_name, product.price as product_price, product.stock as product_stock, product.photo FROM carts INNER JOIN product ON carts.product_id = product.id WHERE user_id = $1 ORDER BY ${sortby} ${sort} LIMIT $2 OFFSET $3`, [user_id, limit, offset], (err, result) => {
      if (!err) {
        resolve(result.rows)
      } else {
        reject(new Error(err))
      }
    })
  })
}

const insertCart = ({ product_id, user_id, quantity }) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO carts(product_id, user_id, quantity)VALUES($1, $2, $3)', [product_id, user_id, quantity], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

const update = ({ product_id, user_id, quantity, id }) => {
  return new Promise((resolve, reject) => {
    pool.query('UPDATE carts SET product_id = COALESCE($1, product_id), user_id = COALESCE($2, user_id), quantity = COALESCE($3, quantity) WHERE id = $4', [product_id, user_id, quantity, id], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

const deleteCart = (id) => {
  return new Promise((resolve, reject) => {
    pool.query('DELETE FROM carts WHERE id = $1', [id], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}
const countCart = (user_id) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT COUNT(*) AS total FROM carts WHERE user_id = $1', [user_id], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

module.exports = {
  selectCart,
  insertCart,
  update,
  deleteCart,
  countCart
}
