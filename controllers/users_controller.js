const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const {
  validateNewUserInputs,
  validateEditUserInputs,
} = require('../middlwares')
const { User } = require('../models/index')

usersRouter.get('/', async (req, res) => {
  try {
    const users = await User.findAll()
    res.status(200).json(users)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'server error', error: err.name })
  }
})

usersRouter.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)

    // check for user if exist
    const user = await User.findByPk(id)

    // if not exist, return not found error
    if (!user) {
      return res.status(404).json({ message: `No user with id ${id}` })
    }

    // else return user
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ message: 'server error', error: err.name })
  }
})

usersRouter.post('/', validateNewUserInputs, async (req, res) => {
  const { name, email, role, password } = req.body

  try {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const newUser = await User.create({ name, email, role, passwordHash })
    return res.json(newUser)
  } catch (error) {
    res.status(500).json({ message: 'server error', error: err.name })
  }
})

usersRouter.put('/:id', validateEditUserInputs, async (req, res) => {
  try {
    const id = Number(req.params.id)

    // check for user if exist
    const user = await User.findByPk(id)

    // if not exist, return not found error
    if (!user) {
      return res.status(404).json({ message: `No user with id ${id}` })
    }

    // else update
    await user.update(req.body)

    res.status(200).json({ message: 'user updated successfully', user })
  } catch (err) {
    res.status(500).json({ message: 'server error', error: err.name })
  }
})

usersRouter.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)

    // check for user if exist
    const user = await User.findByPk(id)

    // if not exist, return not found error
    if (!user) {
      return res.status(404).json({ message: `No user with id ${id}` })
    }

    // else delete
    await user.destroy()

    res.status(200).json({ message: 'user deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'server error', error: err.name })
  }
})

module.exports = usersRouter
