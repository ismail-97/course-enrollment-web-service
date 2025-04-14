const errorHandler = (error, req, res, next) => {
  console.log('error message = ', error.message)

  if (
    error.name === 'SequelizeDatabaseError' ||
    'SequelizeValidationError' ||
    'SequelizeUniqueConstraintError'
  ) {
    return res.status(500).json({
      message: 'server error catched by error handler middleware',
      error: error.message,
    })
  }

  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: error.message,
    })
  }

  next(error)
}

const unknownEndpoints = (req, res) => {
  return res.status(404).json({ error: 'unknown endpoint' })
}

module.exports = { errorHandler, unknownEndpoints }
