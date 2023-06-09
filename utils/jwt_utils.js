const jwt = require('jsonwebtoken')
const createError = require('http-errors')
require('dotenv').config()

const signJwt = (user) => {
    let jwtOptions = { expiresIn: '1d', issuer: process.env.ISSUER }

    return new Promise((resolve, reject) => {
        jwt.sign({sub: user._id}, process.env.PRIVATE_KEY, jwtOptions, (err, token) => {
            if(err) reject(createError(err.message))
            resolve ({
                email: user.email,
                access_token : token
            })
        })
    })
}


const verifyJwt = (req) => {
    let authorizationHeader = req.headers.authorization.split(" ")
    let token = authorizationHeader[1]

    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.PRIVATE_KEY, (err, decodedPayload) => {
            if(err) return reject(createError.Unauthorized())
            resolve(decodedPayload)
        })
    })
       
}


module.exports = { signJwt, verifyJwt }