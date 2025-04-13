const { body } = require('express-validator')
const {
  checkForValidationErrors,
  checkTitleUniqueness,
  isString,
} = require('./utils/validationUtils')

const validateNewCourseInputs = [
  // validate title attribute
  body('title')
    .custom(isString)
    .withMessage('title must be a valid string.')
    .custom(checkTitleUniqueness),

  // validate description attribute
  body('description')
    .custom(isString)
    .withMessage('description must be a valid text.'),

  // validate price attribute
  body('price').isInt().withMessage('price must be an Integer.'),

  // validate is_published attribute
  body('is_published')
    .isBoolean()
    .withMessage('is_published must be a boolean (true or false)'),

  // validate content attribute
  body('content').custom(isString).withMessage('content must be a valid text.'),

  (req, res, next) => {
    // return if there is any validation error
    if (checkForValidationErrors(req, res)) return

    next()
  },
]

module.exports = validateNewCourseInputs
