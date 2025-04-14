const authRouter = require('express').Router()
const JWT = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { SECRET } = require('../util/config')
const { validateCredentials } = require('../middlwares')
const { User } = require('../models/index')

authRouter.post('/login', validateCredentials, async (req, res) => {
  const { email, password } = req.body
  const passwordAsString = password.toString()

  try {
    const user = await User.findOne({ where: { email }, raw: true })
    if (!user) {
      return res.status(401).json({
        message: 'No user associated with this email, please sign up.',
      })
    }

    const passwordIsCorrect = await bcrypt.compare(
      passwordAsString,
      user.passwordHash
    )

    if (!passwordIsCorrect) {
      return res.status(401).json({ message: 'invalid password.' })
    }

    const tokenInfo = {
      email: email,
      id: user.id,
    }
    console.log('before token == ')

    const token = JWT.sign(tokenInfo, SECRET)

    res.status(200).send({ token })
  } catch (error) {
    res.status(500).json({ message: 'database error' })
  }
})

module.exports = authRouter
