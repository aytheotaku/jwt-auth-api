const express = require('express');
const auth_router = express.Router()
const http_codes = require('http-errors');
const { registerController } = require('../controllers/register_controller');
const login_controller = require('../controllers/login_controller');
const protected_route_handler = require('../utils/protected_route_handler');
const { isAuthenticated } = require('../utils/check_role');
const { get_transactions_controller, create_transaction_controller, delete_transaction_controller, find_transaction_byId_controller, update_transaction_controller } = require('../controllers/transactions_controller');

auth_router.get('/', (req, res) => {
    res.redirect('/api/v1')
})
auth_router.get('/v1', (req, res) => {
    res.send('Api is live').status(200)
})

auth_router.post('/v1/register', registerController)

auth_router.post('/v1/login', login_controller)

auth_router.get('/v1/protected-route', protected_route_handler, (req, res) => {
    res.status(200).json({
        status: 'Ok',
        message: 'Welcome to the protected route'
    })
})

auth_router.get('/v1/transactions', protected_route_handler, isAuthenticated, get_transactions_controller)
auth_router.post('/v1/transactions', protected_route_handler, isAuthenticated, create_transaction_controller)

auth_router.get('/v1/transactions/:id', protected_route_handler, isAuthenticated, find_transaction_byId_controller)
auth_router.patch('/v1/transactions/:id', protected_route_handler, isAuthenticated, update_transaction_controller)
auth_router.delete('/v1/transactions/:id', protected_route_handler, isAuthenticated, delete_transaction_controller)



module.exports = {auth_router}