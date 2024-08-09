import { Request, Response, NextFunction } from 'express';
import ResponseSuccess from '~/core/response.success';

import ReasonPhrases from '~/utils/reasonPhrases'

interface HttpRequestMiddlewareOptions {
  responseFormatter?: boolean;
}

const httpRequestMiddleware = ({
  responseFormatter = true,
}: HttpRequestMiddlewareOptions) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (responseFormatter) {
      const responseTypes = Object.keys(ResponseSuccess).map((e) => e.split('Response')[0]);

      res.sendData = (data: any, type: string = responseTypes[0], message?: string) => {
        new ResponseSuccess[`${type}Response` as keyof typeof ResponseSuccess]({
          message: message || ReasonPhrases.OK,
          data
        }).send(res);
      };
      
    }
    next();
  };
};

export default httpRequestMiddleware;
