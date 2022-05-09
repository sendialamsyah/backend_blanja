const pool = require('../config/db')

const selectProduct = () => {
  return pool.query('SELECT * FROM product')
}

const sortProduct = ({ limit, offset, sortby, sort }) => {
  return pool.query(`SELECT * FROM product ORDER BY ${sortby} ${sort} LIMIT $1 OFFSET $2`, [limit, offset])
}

const searchProduct = (search) => {
  return pool.query(`SELECT * FROM product WHERE name LIKE'%${search}%'`)
}

const selectProductById = (id) => {
  return pool.query('SELECT product.*, category.name FROM product INNER JOIN category ON product.categoryId = category.id WHERE productId = $1', [id])
}

const insertProduct = ({ name, description, price, stock, categoryId, sellerId }) => {
  return pool.query('INSERT INTO product(name, description, price, stock, categoryId, sellerId)VALUES($1, $2, $3, $4, $5, $6)', [name, description, price, stock, categoryId, sellerId])
}

const updateProduct = ({ name, description, price, stock, categoryId, sellerId, id }) => {
  return pool.query('UPDATE product SET name = $1, description = $2, price = $3, stock = $4, categoryId = $5, sellerId = $6 WHERE id = $7', [name, description, price, stock, categoryId, sellerId, id])
}

const deleteProduct = (id) => {
  return pool.query('DELETE FROM product WHERE id = $1', [id])
}

module.exports = {
  selectProduct,
  selectProductById,
  insertProduct,
  updateProduct,
  deleteProduct,
  sortProduct,
  searchProduct
}
