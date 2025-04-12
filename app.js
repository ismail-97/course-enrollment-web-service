const express = require('express')
const app = express()
const { Sequelize } = require('sequelize')
const { connectToDatabase } = require('./util/db')
const { User } = require('./models/index')

const authRouter = require('./controllers/auth_controller')
const usersRouter = require('./controllers/users_controller')

connectToDatabase()

app.use(express.json())
app.use('/', authRouter)
app.use('/api/users', usersRouter)

module.exports = app
