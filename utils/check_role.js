const createError = require('http-errors')

const isManager = (req, res, next) => {
    if(!req.user ||  req.user.role !== 'manager' ) return next(createError.Unauthorized('You are not authorized to access this resource'))
    next()
}



module.exports = { isManager }