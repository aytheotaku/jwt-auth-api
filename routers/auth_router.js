const express = require('express');
const auth_router = express.Router()
const http_codes = require('http-errors');
const { model } = require('mongoose');
const { registerController } = require('../controllers/register_controller');
const login_controller = require('../controllers/login_controller');

auth_router.get('/', (req, res) => {
    res.send('Api is live').status(200)
})

auth_router.post('/register', registerController)

auth_router.post('/login', login_controller)



module.exports = {auth_router}