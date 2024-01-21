const express = require('express')
let app = express()
const authRouter = require('./routes/authRoutes')


//middlewares
app.use(express.json())


app.use('/api/v1/auth', authRouter)


module.exports = app