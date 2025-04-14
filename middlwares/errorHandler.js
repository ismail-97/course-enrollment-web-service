const errorHandler = (error, req, res, next) => {
  console.log('error message = ', error.message)

  if (error.name === 'SequelizeDatabaseError') {
    res.status(500).json({
      message: 'server error catched by error handler middleware',
      error: error.message,
    })
  }
}

module.exports = errorHandler
