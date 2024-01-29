const express = require('express')
let app = express()
const authRouter = require('./routes/authRoutes')
const productRouter = require('./routes/productRoute')
const blogRouter = require('./routes/blogRoutes')
const prodCategoryRouter = require('./routes/prodCategoryRoute')
const blogCategoryRouter = require('./routes/blogCategoryRoute')
const brandRouter = require('./routes/brandRoutes')
const couponRouter = require('./routes/couponRoute')
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
app.use('/api/v1/blog', blogRouter)
app.use('/api/v1/prodCategory', prodCategoryRouter)
app.use('/api/v1/blogCategory', blogCategoryRouter)
app.use('/api/v1/brand', brandRouter)
app.use('/api/v1/coupon', couponRouter)

app.use(notFound)
app.use(globalErrorHandler)


module.exports = app