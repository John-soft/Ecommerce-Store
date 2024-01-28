const Brand = require('../models/brandModel')
const asyncWrapper = require('express-async-handler')

const createBrand = asyncWrapper(async (req, res) => {
    const brand = await Brand.create(req.body)
    res.json(brand)
})

const updateBrand = asyncWrapper(async (req, res) => {
    const {id} = req.params
    const updatedBrand = await Brand.findByIdAndUpdate(id, req.body, {new: true})
    res.json(updatedBrand)
})

const deleteBrand = asyncWrapper(async (req, res) => {
    const {id} = req.params
    await Brand.findByIdAndDelete(id)
    res.json({
        message: "Deleted Successfully"
    })
})

const getBrand = asyncWrapper(async (req, res) => {
    const {id} = req.params
    const brand = await Brand.findById(id)
    res.json(brand)
})


const getAllBrands = asyncWrapper(async (req, res) => {
    const brand = await Brand.find()
    res.json(brand)
})


module.exports = {
    createBrand,
    updateBrand,
    deleteBrand,
    getBrand,
    getAllBrands
}