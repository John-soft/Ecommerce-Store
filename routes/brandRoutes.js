const express = require('express')
const {authProtect, isAdmin} = require('../middlewares/authMiddleware')
const { 
    createBrand,
    getAllBrands,
    updateBrand,
    deleteBrand,
    getBrand
 } = require('../controllers/brandController')
const router = express.Router()

router.route('/')
    .post(authProtect, isAdmin , createBrand)
    .get(getAllBrands)
router.route('/:id')
    .patch(authProtect, isAdmin , updateBrand)
    .delete(authProtect, isAdmin , deleteBrand)
    .get(getBrand)

module.exports = router  