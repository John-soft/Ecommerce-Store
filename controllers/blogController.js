const Blog = require('../models/blogModel')
const User = require('../models/userModel')
const asyncWrapper = require('express-async-handler')
const validateMongoId = require('../utils/validateMongoId')

const createBlog = asyncWrapper(async (req, res) => {
    const blog = await Blog.create(req.body)
    res.status(201).json({
        blog
    })
})

const getAllBlogs = asyncWrapper(async (req, res) => {
    const blogs = await Blog.find()
    res.status(200).json({
        length: blogs.length,
        blogs
    })

})

const getBlog = asyncWrapper(async (req, res) => {
    const {id} = req.params
    const blog = await Blog.findById(id).populate('likes').populate('dislikes')
    await Blog.findByIdAndUpdate(id, 
        {$inc: {numViews : 1}},
         {new: true}
        )
    res.status(200).json({
        blog
    })

})

const updateBlog = asyncWrapper(async (req, res) => {
    const {id} = req.params
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {new: true, runValidators: true})
    res.status(201).json({
        updatedBlog
    })
})

const deleteBlog = asyncWrapper(async (req, res) => {
    const {id} = req.params
    const deletedBlog = await Blog.findByIdAndDelete(id)
    res.status(204).json({
        message: "Data Deleted", 
        deletedBlog
    })
})

const likeBlog = asyncWrapper(async(req, res) => {
    const {blogId} = req.body
    //validateMongoId(blogId)
    //find the blog you want to like 
    const blog = await Blog.findById(blogId)
    //find the logged in or current user
    const currentUserId = req.user.id
    //find if the user has liked the post
    const isLiked = blog.isLiked 
    //If it cannot read a property just add question mark (?) to it dislikes?.find()
    const alreadyDisliked = blog?.dislikes?.find((userId) => userId.toString() === currentUserId.toString())
    if (alreadyDisliked) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: {dislikes: currentUserId},
            isDisLiked:false,
        }, {new: true})
        res.json(blog)
    }

    if (isLiked) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: {likes: currentUserId},
            isLiked:false,
        }, {new: true})
        res.json(blog)
    }else{
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $push: {likes: currentUserId},
           isLiked: true,
            }, {new: true})
            res.json(blog)
    }

})


const dislikeBlog = asyncWrapper(async(req, res) => {
    const {blogId} = req.body
    //validateMongoId(blogId)
    //find the blog you want to like 
    const blog = await Blog.findById(blogId)
    //find the logged in or current user
    const currentUserId = req.user.id
    //find if the user has liked the post
    const isDisliked = blog.isDisLiked 
    //If it cannot read a property just add question mark (?) to it dislikes?.find()
    const alreadyliked = blog?.likes?.find((userId) => userId.toString() === currentUserId.toString())
    if (alreadyliked) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: {likes: currentUserId},
            isLiked:false,
        }, {new: true})
        res.json(blog)
    }

    if (isDisliked) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: {dislikes: currentUserId},
            isDisLiked:false,
        }, {new: true})
        res.json(blog)
    }else{
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $push: {dislikes: currentUserId},
           isDisLiked: true,
            }, {new: true})
            res.json(blog)
    }
})

  
module.exports = {
    createBlog,
    updateBlog, 
    getAllBlogs,
    getBlog,
    deleteBlog,
    likeBlog,
    dislikeBlog
}
