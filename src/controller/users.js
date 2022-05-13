const createError = require('http-errors')
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')

const { findByEmail, create } = require('../models/users')
const commonHelper = require('../helper/common')

const register = async (req, res, next) => {
  try {
    const { email, password, fullname } = req.body
    const { rowCount } = await findByEmail(email)

    const salt = bcrypt.genSaltSync(10)
    const passwordHash = bcrypt.hashSync(password, salt)

    if (rowCount) {
      return next(createError(403, 'User sudah terdaftar'))
    }
    const data = {
      id: uuidv4(),
      email,
      password: passwordHash,
      fullname
    }
    await create(data)
    commonHelper.response(res, null, 201, 'User berhasil register')
  } catch (error) {

  }
}

const login = async (req, res, next) => {
  const { email, password } = req.body
  const { rows: [user] } = await findByEmail(email)

  if (!user) {
    return commonHelper.response(res, null, 403, 'email atau password anda salah')
  }

  const validPassword = bcrypt.compareSync(password, user.password)
  if (!validPassword) {
    return commonHelper.response(res, null, 403, 'email atau password anda salah')
  }
  delete user.password
  return commonHelper.response(res, user, 201, 'anda berhasil login')
}
module.exports = {
  register,
  login
}
