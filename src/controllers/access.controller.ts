import express, { Request, Response, NextFunction } from 'express'

import AccessService = require('~/services/access.service')

class AccessController {
  signUp = async (req: Request, res: Response, next: NextFunction) => {
    res.sendData(await AccessService.signUp(req.body), 'Created')
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    res.sendData(await AccessService.login(req.body))
  }
}

export = new AccessController()
