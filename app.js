const express = require('express')
const app = express()
const { Sequelize } = require('sequelize')
const { connectToDatabase } = require('./util/db')
const { User } = require('./models/index')
const { authenticate, authorize } = require('./middlwares')
const authRouter = require('./controllers/authController')
const usersRouter = require('./controllers/usersController')
const coursesRouter = require('./controllers/coursesController')
const enrollmentRouter = require('./controllers/enrollmentsController')
const requestLogger = require('./middlwares/utils/requestLogger')
const errorHandler = require('./middlwares/errorHandler')

connectToDatabase()

app.use(express.json())
app.use(requestLogger)

app.use('/', authRouter)

// all request handlers after this line should be authenticated
app.use(authenticate)

// admins only can use this route because of authoriaztion restriction
app.use('/api/users', authorize('admin'), usersRouter)
app.use('/api/courses', coursesRouter)
app.use('/api/enrollments', enrollmentRouter)

app.use(errorHandler)

module.exports = app
