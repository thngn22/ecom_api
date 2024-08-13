import { Request, Response, NextFunction } from 'express'
import ResponseSuccess from '~/core/response.success'

interface HttpRequestMiddlewareOptions {
  responseFormatter?: boolean
}

const httpRequestMiddleware = ({ responseFormatter = true }: HttpRequestMiddlewareOptions) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (responseFormatter) {
      const responseTypes = Object.keys(ResponseSuccess).map((e) => e.split('Response')[0])

      res.sendData = (data: any, type: string = responseTypes[0]) => {
        new ResponseSuccess[`${type}Response` as keyof typeof ResponseSuccess]({
          data
        }).send(res)
      }
    }
    next()
  }
}

export default httpRequestMiddleware
