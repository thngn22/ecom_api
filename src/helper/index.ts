import { Request, Response, NextFunction } from 'express'

type AsyncHandlerFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>

const asyncHandler = (fn: AsyncHandlerFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next)
  }
}

export { asyncHandler }
