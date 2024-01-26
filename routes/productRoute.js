const express = require('express')
const router = express.Router()
const {isAdmin, authProtect} = require('../middlewares/authMiddleware')
const {
    createProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct
    } = require('../controllers/productController')

router.route('/')
    .post(authProtect, isAdmin , createProduct)
    .get(getAllProducts)
router.route('/:id')
    .get(getProduct)
    .patch(authProtect, isAdmin , updateProduct)
    .delete(authProtect, isAdmin ,deleteProduct)

module.exports = router