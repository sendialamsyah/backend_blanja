const pool = require('../config/db')

exports.select = ({ limit, offset }) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM category LIMIT $1 OFFSET $2', [limit, offset], (err, result) => {
      if (!err) {
        resolve(result.rows)
      } else {
        reject(new Error(err))
      }
    })
  })
}

exports.insert = ({ name }) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO category(name)VALUES($1)', [name], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

exports.update = ({ name, id }) => {
  return new Promise((resolve, reject) => {
    pool.query('UPDATE category SET name = $1 WHERE id = $2', [name, id], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

exports.deleteCategory = (id) => {
  return new Promise((resolve, reject) => {
    pool.query('DELETE FROM category WHERE id = $1', [id], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

exports.countCategory = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT COUNT(*) AS total FROM category', (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}
