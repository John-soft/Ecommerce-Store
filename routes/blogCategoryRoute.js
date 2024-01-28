const express = require('express')
const {authProtect, isAdmin} = require('../middlewares/authMiddleware')
const { 
    createCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory
     } = require('../controllers/blogCategoryController')
const router = express.Router()

router.route('/')
    .post(authProtect, isAdmin , createCategory)
    .get(getAllCategories)
router.route('/:id')
    .patch(authProtect, isAdmin , updateCategory)
    .delete(authProtect, isAdmin , deleteCategory)
    .get(getCategory)

module.exports = router  