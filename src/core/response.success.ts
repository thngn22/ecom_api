import { Response } from 'express'
import StatusCodes from '~/utils/statusCodes'
import ReasonPhrases from '~/utils/reasonPhrases'
import IResponse from './interface/IResponse'

interface ResponseSuccessOptions {
  statusCode: number
  reasonStatusCode?: string
  message?: string
  data?: any
}

class ResponseSuccess implements IResponse {
  public name: string
  public statusCode: number
  public message: string
  public data: any

  constructor({ statusCode, message, data = {} }: ResponseSuccessOptions) {
    this.name = 'ApiSuccess'
    this.statusCode = statusCode
    this.message = message ?? ''
    this.data = data
  }

  send(res: Response): void {
    res.status(this.statusCode).json({
      message: this.message,
      data: this.data
    })
  }
}

class OKResponse extends ResponseSuccess {
  constructor({ data }: { data: any }) {
    super({ statusCode: StatusCodes.OK, message: ReasonPhrases.OK, data })
  }
}

class CreatedResponse extends ResponseSuccess {
  constructor({ data }: { data: any }) {
    super({ statusCode: StatusCodes.CREATED, message: ReasonPhrases.CREATED, data })
  }
}

export default {
  OKResponse,
  CreatedResponse
}
