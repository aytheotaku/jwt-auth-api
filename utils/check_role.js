const createError = require('http-errors')

const isAuthenticated = (req, res, next) => {
    if(!req.user) return next(createError.Unauthorized('You are not authorized to access this resource'))
    next()
}



module.exports = { isAuthenticated }