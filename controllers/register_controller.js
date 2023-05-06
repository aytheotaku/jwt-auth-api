
const createError = require('http-errors')
const { userCreateSchema } = require('../utils/obejct_validations')
const { generatePassword } = require('../utils/passwordUtils')
const User = require('../models/User')
require('dotenv').config()

const registerController = async (req, res, next) => {
    try {

        const {firstName, lastName, email, password, repeatPassword, role} = req.body
        const result = await userCreateSchema.validateAsync({firstName, lastName, email, password, repeatPassword, role}, {stripUnknown: true})

        let userExists = await User.findOne({email: result.email})
        if(userExists) return next(createError.Conflict('User Already Exists'))

        let userPasswordHash = await generatePassword(result.password)
        let user = await User.create({
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            password: userPasswordHash,
            role: result.role
        })
        
        res.status(201).json({
            success: "true",
            message: 'User Created',
            status: 201,
            data: {
                firstName : user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        })
    } catch (error) {
        next(createError(400, error.message))
    }
  
}



module.exports = { registerController }