import { Response } from 'express';

interface IResponse {
  statusCode: number;
  message: string;
  send?(res: Response): void;
}

export default IResponse;
