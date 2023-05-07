const express = require('express');
const auth_router = express.Router()
const http_codes = require('http-errors');
const { registerController } = require('../controllers/register_controller');
const login_controller = require('../controllers/login_controller');
const protected_route_handler = require('../utils/protected_route_handler');
const { isAuthenticated } = require('../utils/check_role');
const { get_transactions_controller, create_transaction_controller, delete_transaction_controller, find_transaction_byId_controller, update_transaction_controller } = require('../controllers/transactions_controller');


auth_router.get('/', (req, res) => {
    res.send('Api is live').status(200)
})

auth_router.post('/register', registerController)

auth_router.post('/login', login_controller)


auth_router.get('/transactions', protected_route_handler, isAuthenticated, get_transactions_controller)
auth_router.post('/transactions', protected_route_handler, isAuthenticated, create_transaction_controller)

auth_router.get('/transactions/:id', protected_route_handler, isAuthenticated, find_transaction_byId_controller)
auth_router.patch('/transactions/:id', protected_route_handler, isAuthenticated, update_transaction_controller)
auth_router.delete('/transactions/:id', protected_route_handler, isAuthenticated, delete_transaction_controller)



module.exports = {auth_router}