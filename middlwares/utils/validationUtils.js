const { User } = require('../../models')
const { validationResult } = require('express-validator')

const checkForValidationErrors = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array().map((arr) => arr.msg) })
  }
}

const checkEmailUniqueness = async (email) => {
  const user = await User.findOne({ where: { email } })
  if (user) {
    throw new Error('Email is not unique')
  }
}

module.exports = {
  checkForValidationErrors,
  checkEmailUniqueness,
}
