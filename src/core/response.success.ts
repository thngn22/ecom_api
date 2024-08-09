import StatusCodes = require('~/utils/statusCodes');
import ReasonPhrases = require('~/utils/reasonPhrases');
import IResponse = require('./interface/IResponse');

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
  }: {
    message: string;
    statusCode?: number;
    reasonStatusCode?: string;
    data?: any;
  }) {
    this.message = message || reasonStatusCode;
    this.name = 'ApiSuccess';
    this.statusCode = statusCode as number;
    this.data = data;
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

export = {
  OKResponse,
  CreatedResponse,
};
