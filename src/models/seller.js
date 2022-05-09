const pool = require('../config/db')

const selectSeller = () => {
  return pool.query('SELECT * FROM seller')
}

const insertSeller = ({ name, storeName, email, password }) => {
  return pool.query('INSERT INTO seller(name, storeName, email, password)VALUES($1, $2, $3, $4)', [name, storeName, email, password])
}

const updateSeller = ({ name, storeName, email, password, id }) => {
  return pool.query('UPDATE seller SET name = $1, storeName = $2, email = $3, password = $4 WHERE id = $5', [name, storeName, email, password, id])
}

const deleteSeller = (id) => {
  return pool.query('DELETE FROM seller WHERE id = $1', [id])
}

module.exports = {
  selectSeller,
  insertSeller,
  updateSeller,
  deleteSeller
}
