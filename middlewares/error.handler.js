function logErrors(err, req, res, next) {
  console.log({ middleware: 'logErrors'})
  // console.error(err)
  next(err)
}

function errorHandler(err, req, res, next) {
  console.log({ middleware: 'errorHandler'})
  return res.status(500).json({
    messages: err.message,
    stack: err.stack
  })
}

function boomErrorHandler(err, req, res, next) {
  console.log({ middleware: 'boomErrorHandler'})
  if (err.isBoom) {
    const { output } = err
    return res.status(output.statusCode).json(output.payload)
  }
  next(err)
}

module.exports = {
  logErrors,
  errorHandler,
  boomErrorHandler
}
