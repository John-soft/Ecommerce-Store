const ProdCategory = require('../models/prodCategoryModel')
const asyncWrapper = require('express-async-handler')
const validateMongoId = require('../utils/validateMongoId')

const createCategory = asyncWrapper(async (req, res) => {
    const category = await ProdCategory.create(req.body)
    res.json(category)
})

const updateCategory = asyncWrapper(async (req, res) => {
    const {id} = req.params
    const updatedCategory = await ProdCategory.findByIdAndUpdate(id, req.body, {new: true})
    res.json(updatedCategory)
})

const deleteCategory = asyncWrapper(async (req, res) => {
    const {id} = req.params
    const deletedCategory = await ProdCategory.findByIdAndDelete(id)
    res.json(deletedCategory)
})

const getCategory = asyncWrapper(async (req, res) => {
    const {id} = req.params
    const category = await ProdCategory.findById(id)
    res.json(category)
})


const getAllCategories = asyncWrapper(async (req, res) => {
    const category = await ProdCategory.find()
    res.json(category)
})


module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    getAllCategories
}
