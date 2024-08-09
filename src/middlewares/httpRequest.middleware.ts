import { Request, Response, NextFunction } from 'express'
import ApiSuccess = require('~/core/response.success')

const httpRequestMiddleware = ({ responseFormatter = true }) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (responseFormatter) {
      const originalSend = res.send

      res.send = function (body?: any): Response {
        const responseTypes = Object.keys(ApiSuccess).map((e) => e.split('Response')[0])
        const type = responseTypes[0]
        const formattedResponse = new ApiSuccess[`${type}Response` as keyof typeof ApiSuccess]({
          data: body,
          message: res.locals.message || ''
        })
        return originalSend.call(this, formattedResponse)
      }
    }
    next()
  }
}

export default httpRequestMiddleware
