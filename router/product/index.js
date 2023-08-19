const express = require('express')
const router = express.Router()
const productController = require('../../controller/productController')
const validate = require('../../utils/validate')

router.get('/getdata', productController.getdata)
router.post('/adddata',validate("productValidation"),  productController.adddata)
router.post('/getonedata', productController.getonedata)
router.post('/updatedata', productController.updatedata)
router.delete('/deletedata', productController.deletedata)

module.exports = router