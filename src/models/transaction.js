/* eslint-disable camelcase */
const pool = require('../config/db')

const selectTransaction = ({ limit, offset, userId, sortby, sort }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT transaction.id, transaction.checkout_id, transaction.userId, transaction.address, transaction.status, transaction.product_id, transaction.total, transaction.quantity, to_char(transaction.created_at, 'FMDay, DD FMMonth YYYY') as date, product.name as product_name, product.photo, product.price, users.fullname, users.address as address_user FROM transaction INNER JOIN users ON transaction.userId = users.id INNER JOIN product ON transaction.product_id = product.id WHERE userId = $1 ORDER BY ${sortby} ${sort} LIMIT $2 OFFSET $3`,
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

const insertTransaction = ({ checkout_id, userId, address, product_id, total, quantity }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'INSERT INTO transaction(checkout_id, userId, address, product_id, total, quantity)VALUES($1, $2, $3, $4, $5, $6)',
      [checkout_id, userId, address, product_id, total, quantity],
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
  product_id,
  total,
  quantity,
  updated_at,
  id
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'UPDATE transaction SET checkout_id = COALESCE($1, checkout_id), userId = COALESCE($2, userId), address = COALESCE($3, address), status = COALESCE($4, status), product_id = COALESCE($5, product_id), total = COALESCE($6, total), quantity = COALESCE($7, quantity), updated_at = COALESCE($8, updated_at) WHERE id = $9',
      [checkout_id, userId, address, status, product_id, total, quantity, updated_at, id],
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
