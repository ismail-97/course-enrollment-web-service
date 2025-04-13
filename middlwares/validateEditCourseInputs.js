const { body } = require('express-validator')
const { checkForValidationErrors } = require('./utils/validationUtils')
const { isString, checkTitleUniqueness } = require('./utils/validationUtils')

const validateEditCourseInputs = [
  // validate title attribute
  body('title')
    .optional()

    .custom(isString)
    .withMessage('title must be a valid string.')
    .custom(checkTitleUniqueness),

  // validate description attribute
  body('description')
    .optional()
    .custom(isString)
    .withMessage('description must be a valid text.'),

  // validate price attribute
  body('price').optional().isInt().withMessage('price must be an Integer.'),

  // validate is_published attribute
  body('is_published')
    .optional()
    .isBoolean()
    .withMessage('is_published must be a boolean (true or false)'),

  // validate content attribute
  body('content')
    .optional()
    .custom(isString)
    .withMessage('content must be a valid text.'),

  (req, res, next) => {
    // return if there is any validation error
    if (checkForValidationErrors(req, res)) return

    const allowedFields = [
      'title',
      'description',
      'price',
      'is_published',
      'content',
    ]
    const toBeUpdatedFields = [...Object.keys(req.body)]

    // check for disallowed Fields
    const invalidFields = toBeUpdatedFields.filter(
      (field) => !allowedFields.includes(field)
    )

    // return error if there is any disallowed field
    if (invalidFields.length > 0) {
      return res.status(400).json({
        message:
          'You can only update these fields: { title, description, price, is_published, content }',
      })
    }

    // check if there is no attributes sent
    const { title, description, price, is_published, content } = req.body
    if (!title && !description && !price && !is_published && !content) {
      return res.status(400).json({
        message: 'No attributes provided for update',
      })
    }

    next()
  },
]

module.exports = validateEditCourseInputs
