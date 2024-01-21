const User = require('../models/userModel')
const {StatusCodes} = require('http-status-codes')
const asyncWrapper = require('express-async-handler')
const generateToken = require('../utils/token')

const register = asyncWrapper( async (req, res, next) => {
    const user = await User.create(req.body)
    const token = generateToken(user._id)
    res.status(StatusCodes.CREATED).json({
       token,    
       user
   })
})

const login = asyncWrapper(async (req,res,next) => {
    const {email, password} = req.body
    //check if user exists
    const user = await User.findOne({email})
    const token = generateToken(user._id)
    if (user && (await user.isPasswordCorrect(password))) {
        res.json({
            token,
            user
        })
    }else{
        throw new Error('Invalid credetials')
    }
})

const getAllUsers = asyncWrapper(async (req,res) => {
    const users = await User.find()
    if (!users) {
        throw new Error('There is an error, please try again')
    }
    res.status(StatusCodes.OK).json({
        users
    })
})


const getUser = asyncWrapper(async (req, res) => {
    const {id} = req.params
    const user = await User.findById(id)
    if (!user) {
        throw new Error('User with the given ID does not exist')
    }

    res.status(StatusCodes.OK).json({
        user
    })

})


const updateUser =  asyncWrapper(async(req, res) => {
    const id = req.params.id 
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {runValidators: true, new: true})
    if (!updatedUser) {
        throw new Error('User with the given ID does not exist')
    }
    res.status(StatusCodes.OK).json({
        updatedUser
    })
})


const deleteUser =  asyncWrapper(async(req, res) => {
    const id = req.params.id 
    const deletedUser = await User.findByIdAndDelete(id)
    if (!deletedUser) {
        throw new Error('User with the given ID does not exist')
    }
    res.status(StatusCodes.OK).json({
        messgae: "Data deleted successfully"
    })
})
 
module.exports = {
    register,
    login,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
}