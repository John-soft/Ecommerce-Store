const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const asyncWrapper = require('express-async-handler')

const authProtect = asyncWrapper(async(req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new Error('Authentication Invalid')
    }
    let token = authHeader.split(' ')[1]

    if (!token) {
        throw new Error('Token is missing')
    }
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_JWT)
        const user = User.findById(decodedToken.id)
        //console.log(decodedToken)
        req.user = user
        next()
    } catch (error) {
        throw new Error('Authentication Failed')
    }
    
})

module.exports = authProtect