const { body } = require('express-validator')
const { checkForValidationErrors } = require('./utils/validationUtils')
const { checkEmailUniqueness } = require('./utils/validationUtils')

const validateEnrollmentInput = [
  // validate email attribute
  body('email').isEmail().withMessage('must be a valid email.'),

  // validate courseId attribute
  body('courseId').isInt().withMessage('courseId must be an Integer.'),

  (req, res, next) => {
    // return if there is any validation error
    if (checkForValidationErrors(req, res)) return

    const { courseId, email } = req.body

    if (!email || !courseId) {
      return res.status(400).json({ message: 'missing attributes.' })
    }
    next()
  },
]

module.exports = validateEnrollmentInput
