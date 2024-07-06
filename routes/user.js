const express = require('express')

const { handleSignupUser, handleLoginUser } = require('../controllers/user')
const router = express.Router()

// signup user POST
router.post('/signup', handleSignupUser)

// login user POST
router.post('/login', handleLoginUser)

module.exports = router