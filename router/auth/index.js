const express = require('express')
const router = express.Router()
const authController = require('../../controller/authController')
const  validate  = require('../../utils/validate')


router.post('/signup',/* validate("authValidation"), */authController.signup)
router.post('/login',authController.login)

module.exports = router