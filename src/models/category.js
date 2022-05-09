const pool = require('../config/db')

const select = ({ limit, offset }) => {
  return pool.query('SELECT * FROM category LIMIT $1 OFFSET $2', [limit, offset])
}

const insert = ({ name }) => {
  return pool.query('INSERT INTO category(name)VALUES($1)', [name])
}

const update = ({ name, id }) => {
  return pool.query('UPDATE category SET name = $1 WHERE id = $2', [name, id])
}

const deleteCategory = (id) => {
  return pool.query('DELETE FROM category WHERE id = $1', [id])
}

const countCategory = () => {
  return pool.query('SELECT COUNT(*) AS total FROM category')
}

module.exports = {
  select,
  insert,
  update,
  deleteCategory,
  countCategory
}
