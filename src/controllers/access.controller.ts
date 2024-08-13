import { Request, Response, NextFunction } from 'express'
import IAuthModel from '~/models/interfaces/IAuth.interface';

import AccessService from '~/services/access.service'

class AccessController {
  signUp = async (req: Request, res: Response, next: NextFunction) => {
    console.log('vao dc controller');
    
    res.sendData(await AccessService.signUp(req.body), 'Created')
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    res.sendData(await AccessService.login(req.body))
  }

  logout = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IAuthModel
    res.sendData(await AccessService.logout(user.email))
  }
}

export = new AccessController()
