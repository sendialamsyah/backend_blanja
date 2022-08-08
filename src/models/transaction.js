/* eslint-disable camelcase */
const pool = require('../config/db')

const selectTransaction = ({ limit, offset, userId }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT transaction.*, product.name as product_name, product.photo, product.price, users.fullname, users.address as address_user, checkout.total, checkout.cart_id, carts.product_id FROM transaction INNER JOIN users ON transaction.userId = users.id INNER JOIN checkout ON checkout.id = transaction.checkout_id INNER JOIN carts ON checkout.cart_id = carts.id INNER JOIN product ON carts.product_id = product.id WHERE userId = $1 LIMIT $2 OFFSET $3',
      [userId, limit, offset],
      (err, result) => {
        if (!err) {
          resolve(result.rows)
        } else {
          reject(new Error(err))
        }
      }
    )
  })
}

const insertTransaction = ({ checkout_id, userId, address }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'INSERT INTO transaction(checkout_id, userId, address)VALUES($1, $2, $3)',
      [checkout_id, userId, address],
      (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      }
    )
  })
}

const update = ({
  checkout_id,
  userId,
  address,
  status,
  updated_at,
  id
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'UPDATE transaction SET checkout_id = COALESCE($1, checkout_id), userId = COALESCE($2, userId), address = COALESCE($3, address), status = COALESCE($4, status), updated_at = COALESCE($5, updated_at) WHERE id = $6',
      [checkout_id, userId, address, status, updated_at, id],
      (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      }
    )
  })
}

const deleteTransaction = (id) => {
  return new Promise((resolve, reject) => {
    pool.query('DELETE FROM transaction WHERE id = $1', [id], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}
const countTransaction = (userId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT COUNT(*) AS total FROM transaction WHERE userId = $1',
      [userId],
      (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      }
    )
  })
}

module.exports = {
  selectTransaction,
  insertTransaction,
  update,
  deleteTransaction,
  countTransaction
}
