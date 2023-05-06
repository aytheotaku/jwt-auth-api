const Joi = require('joi')
const userCreateSchema = Joi.object({

    firstName : Joi.string().min(1).required().trim(),
    lastName : Joi.string().min(1).required().trim(),
    email: Joi.string().email().required().trim(),
    password: Joi.string().min(6).max(12).required(),
    repeatPassword: Joi.ref('password'),
    role: Joi.string().valid('registrar', 'reconciler', 'manager').required().trim()
})

const userLoginSchema = Joi.object({
    email: Joi.string().email().required().trim(),
    password: Joi.string().min(6).max(12).required(),
})

const transactionCreateSchema = Joi.object({
    depositorName: Joi.string().lowercase().min(1).required().trim(),
    transactionAmount : Joi.number().min(1).required(),
    transactionDate: Joi.date().required()
})



module.exports = { userCreateSchema, userLoginSchema, transactionCreateSchema}