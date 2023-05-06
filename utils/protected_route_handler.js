const jwt = require('jsonwebtoken')
const createError = require('http-errors')
const { verifyJwt } = require('./jwt_utils')
const User = require('../models/User')


require('dotenv').config()

const protected_route_handler = async (req,res,next) => {

    try {
        if(!req.headers.authorization) return next(createError.Unauthorized())
        let jwtVerifed = await verifyJwt(req)
        let user = await User.findOne({_id : jwtVerifed.sub})
        req.user = user
        next()
    } catch (error) {
        next(error)
    }
   
}

module.exports = protected_route_handler