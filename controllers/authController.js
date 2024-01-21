const User = require('../models/userModel')
const {StatusCodes} = require('http-status-codes')

const register = async (req, res, next) => {
   const email = req.body.email
   const findUser = await User.findOne({email})
   if (!findUser) {
    const user = await User.create(req.body)
    res.status(StatusCodes.CREATED).json({user})
   }
   res.status(StatusCodes.BAD_REQUEST).json({
    msg: "User already exists"
   })
}  

module.exports = {
    register
}