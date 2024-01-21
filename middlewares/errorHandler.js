const {StatusCodes} = require('http-status-codes')

const notFound = (req, res, next) => {
    const error = new Error(`Not found ${req.originalUrl}`)
    res.status(404)
    next(error)
}

const globalErrorHandler = (err, req, res, next) => {
    const statusCode = res.statusCodes == StatusCodes.OK ? StatusCodes.INTERNAL_SERVER_ERROR : res.statusCode
    res.status(statusCode)
    res.json({
        message: err.message,
        stackTrace: err.stack
    })
}

module.exports = {
    notFound,
    globalErrorHandler
}