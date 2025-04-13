const { User, Course } = require('../../models')
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

const checkTitleUniqueness = async (title) => {
  const course = await Course.findOne({ where: { title } })
  if (course) {
    throw new Error('title is not unique')
  }
}

const isString = (value) => typeof value === 'string' && value.length > 0

module.exports = {
  checkForValidationErrors,
  checkEmailUniqueness,
  checkTitleUniqueness,
  isString,
}
