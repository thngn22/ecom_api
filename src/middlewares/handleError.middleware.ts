/* eslint-disable no-console */
import { Request, Response, NextFunction } from 'express'

import env from '~/configs/environments'
import StatusCodes from '~/utils/statusCodes'
import ReasonPhrases from '~/utils/reasonPhrases'

interface ICustomError extends Error {
  statusCode?: number
}

const handleNotFound = (req: Request, res: Response, next: NextFunction) => {
  const error: ICustomError = new Error('Not found')
  error.statusCode = 404
  next(error)
}

// eslint-disable-next-line no-unused-vars
const handleError = (error: ICustomError, req: Request, res: Response, next: NextFunction) => {
  if (!error.statusCode) error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR

  const responseError = {
    statusCode: error.statusCode,
    message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    stack: error.stack
  }

  // console.log('responseError', responseError)

  // Chỉ khi môi trường là DEV thì mới trả về Stack Trace để debug dễ dàng hơn, còn không thì xóa đi.
  if (env.NODE_ENV !== 'dev') delete responseError.stack

  res.status(responseError.statusCode).json(responseError)
}

export {
  handleError,
  handleNotFound
}
