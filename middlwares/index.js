const validateCredentials = require('./validateCredentials')
const validateNewUserInputs = require('./validateNewUserInputs')
const validateEditUserInputs = require('./validateEditUserInputs')
const validateNewCourseInputs = require('./validateNewCourseInputs')
const validateEditCourseInputs = require('./validateEditCourseInputs')
const validateEnrollmentInput = require('./validateEnrollmentInput')
const { authenticate, authorize } = require('./authMiddleware')
const requestLogger = require('./utils/requestLogger')
requestLogger
module.exports = {
  validateCredentials,
  validateNewUserInputs,
  validateEditUserInputs,
  validateNewCourseInputs,
  validateEditCourseInputs,
  validateEnrollmentInput,
  authenticate,
  authorize,
  requestLogger,
}
