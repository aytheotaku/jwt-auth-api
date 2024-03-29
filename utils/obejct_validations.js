const Joi = require('joi')
const userCreateSchema = Joi.object({

    firstName : Joi.string().min(1).required().trim(),
    lastName : Joi.string().min(1).required().trim(),
    email: Joi.string().email().required().trim(),
    password: Joi.string().min(6).max(25).required(),
    repeatPassword: Joi.string().valid(Joi.ref('password')).required()
})

const userLoginSchema = Joi.object({
    email: Joi.string().email().required().trim(),
    password: Joi.string().min(6).max(25).required(),
})

const transactionCreateSchema = Joi.object({
    depositorName: Joi.string().lowercase().min(1).required().trim(),
    transactionAmount : Joi.number().min(1).required()
})
const transactionUpdateSchema = Joi.object({
    depositorName: Joi.string().lowercase().min(1).required().trim(),
    transactionAmount : Joi.number().min(1).required()
})

const transactionQuerySchema = Joi.object({
    min_amount: Joi.number().min(1),
    max_amount: Joi.number().min(1),
    name : Joi.string().min(1).trim()
})



module.exports = { userCreateSchema, userLoginSchema, transactionCreateSchema, transactionUpdateSchema, transactionQuerySchema}
