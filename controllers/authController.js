const authRouter = require('express').Router()
const JWT = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { SECRET } = require('../util/config')
const { validateCredentials } = require('../middlwares')
const { User } = require('../models/index')

authRouter.post('/login', validateCredentials, async (req, res) => {
  const { email, password } = req.body
  const passwordAsString = password.toString()

  const user = await User.findOne({ where: { email }, raw: true })
  if (!user) {
    return res.status(401).json({
      message: 'No user associated with this email, please sign up.',
    })
  }

  try {
    const passwordIsCorrect = await bcrypt.compare(
      passwordAsString,
      user.passwordHash
    )

    if (!passwordIsCorrect) {
      return res.status(401).json({ message: 'invalid password.' })
    }
  } catch (error) {
    return res.status(400).json({
      message: 'error with bcrypt',
      error: error.message,
    })
  }

  const tokenInfo = {
    email: email,
    id: user.id,
  }
  console.log('before token == ')

  try {
    const token = JWT.sign(tokenInfo, SECRET)

    res.status(200).send({ token })
  } catch (error) {
    return res.status(400).json({
      message: 'error with JWT',
      error: error.message,
    })
  }
})

module.exports = authRouter
