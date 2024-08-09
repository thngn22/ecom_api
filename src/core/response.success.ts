import { Response } from 'express';
import StatusCodes from '~/utils/statusCodes';
import ReasonPhrases from '~/utils/reasonPhrases';
import IResponse from './interface/IResponse';

interface ResponseSuccessOptions {
  message?: string;
  statusCode?: number;
  reasonStatusCode?: string;
  data?: any;
}

class ResponseSuccess implements IResponse {
  public message: string;
  public statusCode: number;
  public data: any;
  public name: string;

  constructor({
    message,
    statusCode = StatusCodes.OK,
    reasonStatusCode = ReasonPhrases.OK,
    data = {},
  }: ResponseSuccessOptions) {
    this.message = message ?? reasonStatusCode;
    this.statusCode = statusCode;
    this.data = data;
    this.name = 'ApiSuccess';
  }

  send(res: Response): void {
    res.status(this.statusCode).json({
      message: this.message,
      data: this.data,
    });
  }
}

class OKResponse extends ResponseSuccess {
  constructor({ message, data }: { message: string; data: any }) {
    super({ message, data });
  }
}

class CreatedResponse extends ResponseSuccess {
  constructor({
    message,
    statusCode = StatusCodes.CREATED,
    reasonStatusCode = ReasonPhrases.CREATED,
    data,
  }: {
    message: string;
    statusCode?: number;
    reasonStatusCode?: string;
    data: any;
  }) {
    super({ message, statusCode, reasonStatusCode, data });
  }
}

export default {
  OKResponse,
  CreatedResponse,
};
