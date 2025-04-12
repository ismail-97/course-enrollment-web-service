const { body } = require('express-validator')
const { checkForValidationErrors } = require('./utils/validationUtils')
const { checkEmailUniqueness } = require('./utils/validationUtils')

const validateEditUserInputs = [
  // validate name attribute
  body('name')
    .optional()
    .isAlpha()
    .withMessage('must be a valid string (alpha) value.'),

  // validate email attribute
  body('email')
    .optional()
    .isEmail()
    .withMessage('must be a valid email.')
    .custom(checkEmailUniqueness),

  (req, res, next) => {
    // return if there is any validation error
    if (checkForValidationErrors(req, res)) return

    const allowedFields = ['name', 'email']
    const toBeUpdatedFields = [...Object.keys(req.body)]

    // check for disallowed Fields
    const invalidFields = toBeUpdatedFields.filter(
      (field) => !allowedFields.includes(field)
    )

    // return error there is any disallowed field
    if (invalidFields.length > 0) {
      return res.status(400).json({
        message: 'You can only update name and email attributes',
      })
    }

    // check if there is no attributes sent
    const { email, name } = req.body
    if (!email && !name) {
      return res.status(400).json({
        message: 'No attributes provided',
      })
    }

    next()
  },
]

module.exports = validateEditUserInputs
