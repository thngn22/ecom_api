import IResponse = require('./interface/IResponse')

class ResponseError extends Error implements IResponse {
  public statusCode: string

  constructor(statusCode: string, message: string) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
    Error.captureStackTrace(this, this.constructor)
  }
}

export default ResponseError
