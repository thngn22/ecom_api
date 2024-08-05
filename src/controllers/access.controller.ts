import express, { Request, Response, NextFunction } from 'express'

import AccessService = require('~/services/access.service')

class AccessController {
  signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await AccessService.signUp(req.body)
      return res.json({
        message: 'Sign up test successful!!',
        metadata: {
          data
        }
      })
    } catch (error) {
      next(error)
    }
  }
}

export = new AccessController()
