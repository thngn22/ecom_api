import { Request } from 'express'
import IAuthModel from '~/models/interfaces/IAuth.interface'

export function isUser(req: Request): req is Request & { user: IAuthModel } {
  return req.user !== undefined
}
