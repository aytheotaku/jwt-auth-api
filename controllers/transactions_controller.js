const Transaction = require("../models/Transaction");
const { transactionCreateSchema, transactionUpdateSchema, transactionQuerySchema } = require("../utils/obejct_validations");
const createError = require('http-errors')



const create_transaction_controller = async (req, res, next) => {
    try {
        let transactionValidationResult = await transactionCreateSchema.validateAsync(req.body)
        transactionValidationResult.transactionDate = new Date().toString()
        transactionValidationResult.depositorName = transactionValidationResult.depositorName.trim().replace(/\s+/g, ' ')
        let transaction = await Transaction.create(transactionValidationResult)
        res.status(201).json({
            success: "true",
            message: 'Transaction Created',
            status: 201
        })
    } catch (error) {
        next(createError.BadRequest(error.message))
    }
}


const get_transactions_controller = async (req, res, next) => {

    try {   
            const { 'min-amount': min_amount, 'max-amount':max_amount, name } = req.query
            let validatedQuery = await transactionQuerySchema.validateAsync({min_amount, max_amount, name})
            const query = {}
            if(min_amount || max_amount) query.transactionAmount = {}
            if(min_amount) {
                query.transactionAmount.$gte = min_amount
            }
            if(max_amount){ query.transactionAmount.$lte = max_amount}
            if(name) query.depositorName = name
                
            console.log(query)
            let transactions = await Transaction.find(query).sort({transactionAmount : 1})
            let data = transactions ? transactions : []
            res.status(200).json({
                success: "true",
                message: "Transactions fetched",
                status: 200,
                data: data
            }) 

    
    } catch (error) {
        next(createError.BadRequest(error.message))
    }

}



const find_transaction_byId_controller = async (req, res, next) => {
    try {
        const { id } = req.params
        try {
            let transaction = await Transaction.findById(id)
            if(!transaction) return next(createError.NotFound('Transaction does not exist'))
            res.status(200).json({
                success: "true",
                message: 'Transaction Deleted',
                status: 200,
                data : transaction
            })  
        } catch (error) {
            next(createError.NotFound('Transaction does not exist'))
        }

    } catch (error) {
        
    }
}



const delete_transaction_controller = async (req, res, next) => {
    const { id } = req.params
    try {
        let transaction = await Transaction.findByIdAndDelete(id)
        if(!transaction) return next(createError.NotFound('Transaction does not exist'))
        res.status(200).json({
            success: "true",
            message: 'Transaction Deleted',
            status: 200,
        })  
    } catch (error) {
        next(createError.NotFound('Transaction does not exist'))
    }
    
}

const update_transaction_controller = async(req, res, next) => {
    try {
        const { id } = req.params  
        let transaction = await Transaction.findById(id)
        if(!transaction) return next(createError.NotFound('Transaction does not exist'))
    
        let transactionToUpdate = await transactionUpdateSchema.validateAsync(req.body)    
        let updatedTransaction = await Transaction.findByIdAndUpdate(id,transactionToUpdate, { new: true })
        res.status(200).json({
            success: "true",
            message: 'Transaction Updated',
            status: 200,
            data: {
                depositorName : updatedTransaction.depositorName,
                transactionAmount: updatedTransaction.transactionAmount
            }
        })
    } catch (error) {
        if(error.isJoi){
            return next(createError.BadRequest(error.message))
        }
        next(createError.NotFound('Transaction does not exist'))
    }
}


module.exports = { get_transactions_controller, 
                    create_transaction_controller, 
                     delete_transaction_controller,
                    find_transaction_byId_controller,
                    update_transaction_controller        
                }