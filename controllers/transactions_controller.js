const Transaction = require("../models/Transaction");
const { transactionCreateSchema } = require("../utils/obejct_validations");


const get_transactions_controller = async (req, res, next) => {

    try {
        let transactions = await Transaction.find()
        if(!transactions) res.status(200).json({
            data: []
        })
        res.status(200).json(transactions)
    } catch (error) {
        next(error)
    }

}

const create_transaction_controller = async (req, res, next) => {
    try {
        let transactionValidationResult = await transactionCreateSchema.validateAsync(req.body)
        transactionValidationResult.depositorName = transactionValidationResult.depositorName.trim().replace(/\s+/g, ' ')
        let transaction = await Transaction.create(transactionValidationResult)
        res.status(201).json({
            status: 201,
            message: 'Transaction Created'
        })
    } catch (error) {
        next(error)
    }
}




module.exports = { get_transactions_controller, create_transaction_controller }