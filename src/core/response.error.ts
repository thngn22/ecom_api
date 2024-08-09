import IResponse from './interface/IResponse';

class ResponseError extends Error implements IResponse {
  public statusCode: number

  constructor(statusCode: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
    Error.captureStackTrace(this, this.constructor)
  }
}

export default ResponseError
