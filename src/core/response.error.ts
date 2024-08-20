import IResponse from './interface/IResponse'

class ResponseError extends Error implements IResponse {
  public statusCode: number

  constructor(message?: string, statusCode: number = 500) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
    Error.captureStackTrace(this, this.constructor)
  }
}

export default ResponseError
