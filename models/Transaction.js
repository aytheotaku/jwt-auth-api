const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    depositorName : {
        type: String,
        required: true
    },
    transactionAmount : {
        type: String,
        required: true
    },
    transactionDate : {
        type: String,
        required: true,

    }
})

const Transaction = mongoose.model('transaction', transactionSchema)

module.exports = Transaction