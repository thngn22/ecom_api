import { Request, Response, NextFunction } from 'express'
import IAuthModel from '~/models/interfaces/IAuth.interface';

import AccessService from '~/services/access.service'

class AccessController {
  signUp = async (req: Request, res: Response, next: NextFunction) => {
    res.sendData(await AccessService.signUp(req.body), 'Created')
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IAuthModel
    res.sendData(await AccessService.login(user, res))
  }

  logout = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IAuthModel
    res.sendData(await AccessService.logout(user, req, res))
  }

  refresh = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IAuthModel
    res.sendData(await AccessService.refresh(user, res))
  }
}

export = new AccessController()
