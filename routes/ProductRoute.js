const express=require('express')
const { createProduct, getProduct } = require('../controller/productController')

const router=express.Router()


router.route('/inventory').post(createProduct)
router.route('/inventory').get(getProduct)

module.exports=router;