const express = require('express')
const router = express.Router()
const auth = require('./auth')
const user = require('./user/index')
const product = require('./product/index')
const {authorize} = require('../middleware/jwtuser')
const { buyproduct } = require('../controller/buyProduct')

router.use('/user',authorize(["admin"]),user) //,authorize(["admin"])
router.use('/product',product) //,authorize(["admin"])//(["admin","user"])
router.use('/auth',auth)
router.post("/buyproduct",buyproduct)

module.exports = router