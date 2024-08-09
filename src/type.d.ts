import { Response } from 'express';

declare module 'express-serve-static-core' {
  interface Response {
    sendData: (data: any, type?: string, message?: string) => void;
  }
}
