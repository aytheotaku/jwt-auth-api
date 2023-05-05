const express = require('express')
const morgan = require('morgan');
const {auth_router} = require('./routers/auth_router');
const createError = require('http-errors');
const mongoose = require('mongoose')
const app = express()

// app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(morgan('dev'))
app.use(express.json())
require('dotenv').config()
require('./controllers/login_controller')
const port = process.env.PORT || 3000

app.use('/api', auth_router)


app.use(async (req, res, next) => {
    next(createError.NotFound())
})


process.nextTick(async(req, res) => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_URI)
        console.log(`DB connected successfully`)
        app.listen(port, () => console.log(`Example app listening at http://localhost:3000`))
    } catch (error) {
        console.log(error)
        res.json({status: 500, message: error.message}).status(500)
    }
})


app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})


process.on('SIGINT', async(req, res) => {
    try {
        await mongoose.connection.close()
        console.log('Connection to Mongo Closed Successfully')
        process.exit(0)
    } catch (error) {
        console.log(error)
        res.json({status: 500, message: error.message}).status(500)
    }
})
