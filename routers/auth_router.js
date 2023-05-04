const express = require('express');
const auth_router = express.Router()
const http_codes = require('http-errors');
const { model } = require('mongoose');

auth_router.get('/', (req, res) => {
    res.send('Api is live').status(200)
})


module.exports = {auth_router}