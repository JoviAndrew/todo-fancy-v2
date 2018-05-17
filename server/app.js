require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds153577.mlab.com:53577/todolist`)
// // const port = process.env.PORT || 4000

const indexRouter = require('./routers/index') 
const todoRouter = require('./routers/todo')
const userRouter = require('./routers/user')
const weatherRouter = require('./routers/weather')

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/index', indexRouter)
app.use('/todo', todoRouter)
app.use('/user', userRouter)
app.use('/weather', weatherRouter)

app.listen(3000, () =>{
    console.log('listening on port 3000')
})