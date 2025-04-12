const { body } = require('express-validator')
const { checkForValidationErrors } = require('./utils/validationUtils')

const validateCredentials = [
  // validate email attribute
  body('email').isEmail().withMessage('you must provide a valid email.'),

  // validate password attribute
  body('password').notEmpty().withMessage('you must provide a valid password.'),

  (req, res, next) => {
    // return if there is any validation error
    if (checkForValidationErrors(req, res)) return
    next()
  },
]

module.exports = validateCredentials
