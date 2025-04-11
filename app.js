const express = require('express')
const app = express()
const { Sequelize } = require('sequelize')
const { connectToDatabase } = require('./util/db')
const { User } = require('./models/index')
connectToDatabase()

app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello, enrollment management backend service')
})
app.get('/api/users', async (req, res) => {
  const users = await User.findAll()
  res.json(users)
})

module.exports = app
