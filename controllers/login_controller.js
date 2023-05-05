const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { userLoginSchema } = require('../utils/obejct_validations')
const { validatePassword } = require('../utils/passwordUtils')
const createError = require('http-errors')
const { signJwt } = require('../utils/jwt_utils')



const login_controller = async(req, res, next) => {
    try {
        const userLogin = await userLoginSchema.validateAsync(req.body, {stripUnknown: true})
        
        let user = await User.findOne({email: userLogin.email})

        if(!user || !await validatePassword(userLogin.password,user.password)){
            return next(createError.Unauthorized('Invalid Email Or Password'))
        }

        let response = await signJwt(user)
        res.status(200).json(response)
 
    } catch (error) {
        next(createError.BadRequest(error.message))
    }
}

module.exports = login_controller