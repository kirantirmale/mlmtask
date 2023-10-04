const express = require('express')
const router = express.Router()
const userController = require('../../controller/userController')
const validate = require('../../utils/validate')

router.get('/getdata', userController.getdata)
router.post('/adddata',validate("userValidation"), userController.adddata)
router.post('/getonedata', userController.getonedata)
router.post('/updatedata', userController.updatedata)
router.delete('/deletedata', userController.deletedata)

module.exports = router