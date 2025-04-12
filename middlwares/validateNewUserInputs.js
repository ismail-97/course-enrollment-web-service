const { body } = require('express-validator')
const { checkForValidationErrors } = require('./utils/validationUtils')
const { checkEmailUniqueness } = require('./utils/validationUtils')

const roles = ['instructor', 'student']

const validateNewUserInputs = [
  // validate name attribute
  body('name')
    .isAlpha()
    .withMessage('must be a valid string (alpha) value.')
    .notEmpty()
    .withMessage('must not be empty.'),

  // validate email attribute
  body('email')
    .isEmail()
    .withMessage('must be a valid email.')
    .custom(checkEmailUniqueness),

  // validate role attribute
  body('role').isIn(roles).withMessage('must be a valid role.'),

  // validate password attribute
  body('password').notEmpty().withMessage('must be a valid password.'),

  (req, res, next) => {
    // return if there is any validation error
    if (checkForValidationErrors(req, res)) return

    next()
  },
]

module.exports = validateNewUserInputs
