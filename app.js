const express = require('express')
let app = express()
const authRouter = require('./routes/authRoutes')
const bodyParser = require('body-parser')
const {notFound, globalErrorHandler} = require('./middlewares/errorHandler')
const cookieParser = require('cookie-parser')

//middlewares
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())

app.use('/api/v1/auth', authRouter)

app.use(notFound)
app.use(globalErrorHandler)


module.exports = app