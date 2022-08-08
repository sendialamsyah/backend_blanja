const express = require('express')
const router = express.Router()
const { register, login, profile, refreshToken, updateProfile } = require('../../controller/auth/users')
const { protect } = require('../../middlewares/auth')
const upload = require('../../middlewares/upload')

router
  .post('/register', register)
  .post('/login', login)
  .post('/refresh-token', refreshToken)
  .get('/profile', protect, profile)
  .get('/:id', profile)
  .put('/edit-profile', protect, upload.single('photo'), updateProfile)

module.exports = router
