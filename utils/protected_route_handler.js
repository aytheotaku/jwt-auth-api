const jwt = require('jsonwebtoken')
const createError = require('http-errors')
const { verifyJwt } = require('./jwt_utils')
const User = require('../models/User')


require('dotenv').config()

const protected_route_handler = async (req,res,next) => {

    try {
        let jwtVerifed = await verifyJwt(req)
        console.log(jwtVerifed)
        let user = await User.findOne({_id : jwtVerifed.sub})
        res.status(201).json(user)
    } catch (error) {
        next(error)
    }
   
}

module.exports = protected_route_handler