/* eslint-disable camelcase */
const pool = require('../config/db')

const selectProduct = ({ limit, offset, sortby, sort, search }) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM product WHERE name ILIKE'%${search}%' ORDER BY ${sortby} ${sort} LIMIT $1 OFFSET $2`, [limit, offset], (err, result) => {
      if (!err) {
        resolve(result.rows)
      } else {
        reject(new Error(err))
      }
    })
  })
}

const selectProductById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT product.*, category.name as nameCategory FROM product INNER JOIN category ON product.category_id = category.id WHERE product.id = $1', [id], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

const insertProduct = ({ name, description, price, stock, photo, category_id }) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO product(name, description, price, stock, photo, category_id)VALUES($1, $2, $3, $4, $5, $6)', [name, description, price, stock, photo, category_id], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

const update = ({ name, description, price, stock, photo, category_id, id }) => {
  return new Promise((resolve, reject) => {
    pool.query('UPDATE product SET name = COALESCE($1, name), description = COALESCE($2, description), price = COALESCE($3, price), stock = COALESCE($4, stock), photo = COALESCE($5, photo), category_id = COALESCE($6, category_id) WHERE id = $7', [name, description, price, stock, photo, category_id, id], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

const deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    pool.query('DELETE FROM product WHERE id = $1', [id], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}
const countProduct = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT COUNT(*) AS total FROM product', (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

module.exports = {
  selectProduct,
  selectProductById,
  insertProduct,
  update,
  deleteProduct,
  countProduct
}
