const express = require('express')
const router = express.Router()
const auth = require('./auth')
const user = require('./user/index')
const {authorize} = require('../middleware/jwtuser')

router.use('/user',authorize(["admin"]),user) //,authorize(["admin"])
router.use('/auth',auth)

module.exports = router