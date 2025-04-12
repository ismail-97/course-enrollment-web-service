const validateCredentials = require('./validateCredentials')
const validateNewUserInputs = require('./validateNewUserInputs')
const validateEditUserInputs = require('./validateEditUserInputs')
const { authenticate, authorize } = require('./authMiddleware')

module.exports = {
  validateCredentials,
  validateNewUserInputs,
  validateEditUserInputs,
  authenticate,
  authorize,
}
