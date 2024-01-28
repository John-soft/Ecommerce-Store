const express = require('express')
const { 
    createCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    getAllCategories
     } = require('../controllers/prodCategoryController')
const { authProtect, isAdmin } = require('../middlewares/authMiddleware')
const router = express.Router()


router.route('/')
    .post(authProtect, isAdmin , createCategory)
    .get(getAllCategories)
router.route('/:id')
    .patch(authProtect, isAdmin , updateCategory)
    .delete(authProtect, isAdmin , deleteCategory)
    .get(getCategory)


module.exports = router