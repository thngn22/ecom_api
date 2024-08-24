import { Request, Response, NextFunction } from 'express'
import ApiKeyService = require('~/services/apiKEy.service')
import HEADER from './types/Header'

const apiKey = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString()
    if (!key) {
      return res.status(403).json({
        message: 'Fobidden Error'
      })
    }

    //check objKey
    const objKey = await ApiKeyService.findOne({ key, status: true })
    if (!objKey) {
      return res.status(403).json({
        message: 'Fobidden Error'
      })
    }

    return next()
  } catch (error) {
    return {
      code: '402',
      message: 'ApiKey denied'
    }
  }
}

export { apiKey }
