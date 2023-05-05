const Joi = require('joi')
const userCreateSchema = Joi.object({

    firstName : Joi.string().min(1).required().trim(),
    lastName : Joi.string().min(1).required().trim(),
    email: Joi.string().email().required().trim(),
    password: Joi.string().min(6).max(12).required(),
    repeatPassword: Joi.ref('password')
})

const userLoginSchema = Joi.object({
    email: Joi.string().email().required().trim(),
    password: Joi.string().min(6).max(12).required(),
})



module.exports = { userCreateSchema, userLoginSchema }