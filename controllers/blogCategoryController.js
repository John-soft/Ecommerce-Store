const BlogCategory = require('../models/blogCategoryModel')
const asyncWrapper = require('express-async-handler')

const createCategory = asyncWrapper(async (req, res) => {
    const category = await BlogCategory.create(req.body)
    res.json(category)
})

const updateCategory = asyncWrapper(async (req, res) => {
    const {id} = req.params
    const updatedCategory = await BlogCategory.findByIdAndUpdate(id, req.body, {new: true})
    res.json(updatedCategory)
})

const deleteCategory = asyncWrapper(async (req, res) => {
    const {id} = req.params
    const deletedCategory = await BlogCategory.findByIdAndDelete(id)
    res.json(deletedCategory)
})

const getCategory = asyncWrapper(async (req, res) => {
    const {id} = req.params
    const category = await BlogCategory.findById(id)
    res.json(category)
})


const getAllCategories = asyncWrapper(async (req, res) => {
    const category = await BlogCategory.find()
    res.json(category)
})


module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    getAllCategories
}