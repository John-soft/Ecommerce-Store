const express = require('express')
const router = express.Router()
const {authProtect, isAdmin} = require('../middlewares/authMiddleware')
const {
    createBlog,
    updateBlog,
    getAllBlogs,
    getBlog,
    deleteBlog,
    likeBlog,
    dislikeBlog
} = require('../controllers/blogController')

router.route('/')
    .post(authProtect, isAdmin , createBlog)
    .get(getAllBlogs)
router.route('/likes')
    .patch(authProtect , likeBlog)
router.route('/dislikes')
    .patch(authProtect , dislikeBlog)
router.route('/:id')
    .patch(authProtect, isAdmin , updateBlog)
    .get(getBlog)
    .delete(authProtect, isAdmin , deleteBlog)

module.exports = router