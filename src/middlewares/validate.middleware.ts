import { Request, Response, NextFunction } from 'express'

import SchemaType from './types/SchemaType'
import StatusCodes from '~/utils/statusCodes'
import ResponseError from '~/core/response.error'

const validate = (schema: SchemaType = {}) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validateFields: Array<keyof SchemaType> = ['body', 'query', 'params']

    validateFields.forEach((field) => {
      if (schema[field]) {
        const result = schema[field]!.safeParse(req[field])
        if (!result.success) {
          // Sử dụng mảng các lỗi thay vì một chuỗi
          const errorMessages = result.error.errors.map((err) => {
            return `${err.path.join('.')} - ${err.message}`
          })
          next(new ResponseError(errorMessages.join(', '), StatusCodes.BAD_REQUEST))
        } else {
          req[field] = result.data
        }
      }
    })
    next()
  }
}

export default validate
