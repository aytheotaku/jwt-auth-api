const express = require('express');
const auth_router = express.Router()
const http_codes = require('http-errors');
const { model } = require('mongoose');
const { registerController } = require('../controllers/register_controller');
const login_controller = require('../controllers/login_controller');
const protected_route_handler = require('../utils/protected_route_handler');
const { isManager } = require('../utils/check_role');
const { get_transactions_controller, create_transaction_controller } = require('../controllers/transactions_controller');


auth_router.get('/', (req, res) => {
    res.send('Api is live').status(200)
})

auth_router.post('/register', registerController)

auth_router.post('/login', login_controller)

auth_router.get('/protected-route', protected_route_handler, (req, res) => {
    res.status(200).json({
        status: 'Ok',
        message: 'Welcome to the protected route'
    })
})

auth_router.get('/transactions', protected_route_handler, isManager, get_transactions_controller)
auth_router.post('/transactions', protected_route_handler, isManager, create_transaction_controller)





module.exports = {auth_router}