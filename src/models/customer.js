const pool = require('../config/db')

const selectCustomer = () => {
  return pool.query('SELECT * FROM customer')
}

const insertCustomer = ({ name, address, email, password }) => {
  return pool.query('INSERT INTO customer(name, address, email, password)VALUES($1, $2, $3, $4)', [name, address, email, password])
}

const updateCustomer = ({ name, address, email, password, id }) => {
  return pool.query('UPDATE customer SET name = $1, address = $2, email = $3, password = $4 WHERE id = $5', [name, address, email, password, id])
}

const deleteCustomer = (id) => {
  return pool.query('DELETE FROM customer WHERE id = $1', [id])
}

module.exports = {
  selectCustomer,
  insertCustomer,
  updateCustomer,
  deleteCustomer
}
