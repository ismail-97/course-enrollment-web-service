const validateCredentials = require('./validateCredentials')
const validateNewUserInputs = require('./validateNewUserInputs')
const validateEditUserInputs = require('./validateEditUserInputs')
const validateNewCourseInputs = require('./validateNewCourseInputs')
const validateEditCourseInputs = require('./validateEditCourseInputs')
const { authenticate, authorize } = require('./authMiddleware')

module.exports = {
  validateCredentials,
  validateNewUserInputs,
  validateEditUserInputs,
  validateNewCourseInputs,
  validateEditCourseInputs,
  authenticate,
  authorize,
}
