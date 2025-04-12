const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')

// for authentication
const authenticate = async (req, res, next) => {
  let token = req.get('authorization')

  //check if token is provided
  if (!token) {
    res.status(401).json({ message: 'Token is needed' })
  }

  //remove the 'Bearer' word form the token header.
  token = token.substring(7)

  try {
    // verify the token
    const decoded = jwt.verify(token, SECRET)

    // find the user
    const userId = decoded.id
    const user = await User.findByPk(userId)

    // return not found if user doesn't exist
    if (!user) {
      return res.status(404).json({ message: 'user not found' })
    }

    //else assign the user to request object
    req.user = user
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' })
  }

  next()
}

// for detecting user role
const authorize = (auhtorizedRoles) => {
  return (req, res, next) => {
    if (!auhtorizedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: `${req.user.role} isn't authorized to send this request`,
      })
    }
    next()
  }
}

module.exports = { authenticate, authorize }
