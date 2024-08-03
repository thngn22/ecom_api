import express, { Request, Response, NextFunction } from 'express'

import AuthService = require('~/services/auth.service')

class AuthController {
  signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await AuthService.signUp(req.body)
      return res.status(201).json({
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

export = new AuthController()
