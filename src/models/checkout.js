/* eslint-disable camelcase */
const pool = require('../config/db')

const selectCheckout = ({ limit, offset, id_user }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT checkout.*, product.name as product_name, product.photo, product.price, users.fullname, users.address, carts.product_id, carts.quantity FROM checkout INNER JOIN users ON checkout.id_user = users.id INNER JOIN carts ON checkout.cart_id = carts.id INNER JOIN product ON carts.product_id = product.id WHERE id_user = $1 LIMIT $2 OFFSET $3',
      [id_user, limit, offset],
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

const insertCheckout = ({ cart_id, id_user, address, total }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'INSERT INTO checkout(cart_id, id_user, address, total)VALUES($1, $2, $3, $4)',
      [cart_id, id_user, address, total],
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
  cart_id,
  id_user,
  address,
  total,
  status,
  updated_at,
  id
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'UPDATE checkout SET cart_id = COALESCE($1, cart_id), id_user = COALESCE($2, id_user), address = COALESCE($3, address), total = COALESCE($4, total), status = COALESCE($5, status), updated_at = COALESCE($6, updated_at) WHERE id = $7',
      [cart_id, id_user, address, total, status, updated_at, id],
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

const deleteCheckout = (id) => {
  return new Promise((resolve, reject) => {
    pool.query('DELETE FROM checkout WHERE id = $1', [id], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}
const countCheckout = (id_user) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT COUNT(*) AS total FROM checkout WHERE id_user = $1',
      [id_user],
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
  selectCheckout,
  insertCheckout,
  update,
  deleteCheckout,
  countCheckout
}
