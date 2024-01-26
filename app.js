const express = require('express')
let app = express()
const authRouter = require('./routes/authRoutes')
const productRouter = require('./routes/productRoute')
const bodyParser = require('body-parser')
const {notFound, globalErrorHandler} = require('./middlewares/errorHandler')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')

//middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/product', productRouter)

app.use(notFound)
app.use(globalErrorHandler)


module.exports = app