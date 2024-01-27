const User = require('../models/userModel')
const {StatusCodes} = require('http-status-codes')
const asyncWrapper = require('express-async-handler')
const generateToken = require('../config/token')
const validateMongoId = require('../utils/validateMongoId')
const generateRefreshToken = require('../config/refreshToken')
const jwt = require('jsonwebtoken')
const sendEmail = require('./email')

//handle refresh token
const handleRefreshToken = asyncWrapper(async (req, res) => {
    const cookie = req.cookies
    //console.log(cookie);
    if (!cookie.refreshToken) throw new Error('No refresh token in cookies')
    const refreshToken = cookie.refreshToken
    //console.log(refreshToken);
    const user = await User.findOne({refreshToken})
    if (!user) throw new Error('Refresh token is missing')
    jwt.verify(refreshToken, process.env.SECRET_JWT, (err, decoded) => {

        if (err || user.id !== decoded.id) throw new Error('There is something wrong with the refresh token')
        const accessToken = generateToken(user._id)
    res.json({accessToken})
    })
})

//handle logout functionality
const logout = asyncWrapper(async (req, res) => {
    const cookie = req.cookies
    if (!cookie.refreshToken) throw new Error('No refresh token in cookies')
    const refreshToken = cookie.refreshToken
const user = await User.findOne({refreshToken})
if (!user) {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
    })
    return res.sendStatus(204)
}
    await User.findOneAndUpdate({refreshToken}, {
        refreshToken: ""
    })
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
    })
    return res.sendStatus(204)

})
 

const register = asyncWrapper( async (req, res, next) => {
    const user = await User.create(req.body)
    //const token = generateToken(user._id)
    res.status(StatusCodes.CREATED).json({
       //token,    
       user
   })
})

const login = asyncWrapper(async (req,res,next) => {
    const {email, password} = req.body
    //check if user exists
    const user = await User.findOne({email})
    const token = generateToken(user._id)
    if (user && (await user.isPasswordCorrect(password))) {
        const refreshToken = await generateRefreshToken(user._id)
        const updatedUser = await User.findByIdAndUpdate(user.id, {refreshToken: refreshToken},{new: true})
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000
        })
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
    validateMongoId(id)
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
    validateMongoId(id)
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
    validateMongoId(id)
    const deletedUser = await User.findByIdAndDelete(id)
    if (!deletedUser) {
        throw new Error('User with the given ID does not exist')
    }
    res.status(StatusCodes.OK).json({
        messgae: "Data deleted successfully"
    })
})

const blockUser = asyncWrapper(async (req, res,next) => {
    const id = req.params.id
    validateMongoId(id)
    const blockedUser = await User.findByIdAndUpdate(id, {isBlocked: true}, {new: true})
    res.status(StatusCodes.ACCEPTED).json({
        message: "User blocked",
        blockedUser
    })
})
 

const unblockUser = asyncWrapper(async (req, res,next) => {
    const id = req.params.id
    validateMongoId(id)
    const unblockedUser = await User.findByIdAndUpdate(id, {isBlocked: false}, {new: true})
    res.status(StatusCodes.ACCEPTED).json({
        message:"User unblocked",
        unblockedUser
    })
})



const updatePassword = asyncWrapper(async (req, res, next) => {
    const {_id} = req.user
    const {password}= req.body
    validateMongoId(_id)
    const user = await User.findById(_id)
    if (password) {
        user.password = password
        const updatedPassword = await user.save()
        res.json(updatedPassword)
    }else{
        res.json(user)
    }
})

const forgotPasswordToken = asyncWrapper(async(req, res) => {
    const {email} = req.body
    const user = await User.findOne({email})
    if (!user) throw new Error('Email not found')
    try {
        const token = await user.createPasswordResetToken()
        await user.save()
        const resetUrl = `Hi, Please follow this link to reset your password.This will link will only be valid for 10 minutes.<a href='http://localhost:7000/api/v1/auth/forgotPassword/${token}'>Click here</>`;
        const data = {
            to: email,
            text: "Hey User",
            subject:"Forgot Password Link",
            html: resetUrl 
        }
        sendEmail(data)
        res.json(token)
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = {
    register,
    login,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    blockUser,
    unblockUser,
    handleRefreshToken,
    logout,
    updatePassword,
    forgotPasswordToken
}