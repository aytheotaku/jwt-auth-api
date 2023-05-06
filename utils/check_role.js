const createError = require('http-errors')

const isManager = (req, res, next) => {
    if(!req.user ||  req.user.role !== 'manager' ) return next(createError.Unauthorized('You are not authorized to access this resource'))
    next()
}
const isReconciler = (req, res, next) => {
    if(!req.user ||  (req.user.role !== 'reconciler' || req.user.role != 'manager') ) return next(createError.Unauthorized('You are not authorized to access this resource'))
    next()
}
const isRegistrar = (req, res, next) => {
    if(!req.user ||   (req.user.role !== 'registrar' || req.user.role != 'manager')) return next(createError.Unauthorized('You are not authorized to access this resource'))
    next()
}



module.exports = { isManager, isReconciler, isRegistrar }