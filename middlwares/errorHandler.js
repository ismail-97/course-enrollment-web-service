const errorHandler = (error, req, res, next) => {
  console.log('error message = ', error.message)

  if (error.name === 'SequelizeDatabaseError') {
    return res.status(500).json({
      message: 'server error catched by error handler middleware',
      error: error.message,
    })
  }
  // other error types to be added here

  next(error)
}

const unknownEndpoints = (req, res) => {
  return res.status(404).json({ error: 'unknown endpoint' })
}

module.exports = { errorHandler, unknownEndpoints }
