import { Request, Response, NextFunction } from 'express'

import ResponseError from '~/core/response.error'
import { decodeAccessToken, decodeRefreshToken } from '~/lib/jwt'
import StatusCodes from '~/utils/statusCodes'
import authRepo from '~/repositories/auth.repo'
import IPayloadJWT from '~/lib/types/jwt.interface'

const verifyAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.headers['authorization']
    if (!accessToken) throw new ResponseError('Missing access token', StatusCodes.UNAUTHORIZED)
    const payload = decodeAccessToken(accessToken.split(' ')[1])
    if (!payload) {
      throw new ResponseError('Invalid accessToken', StatusCodes.UNAUTHORIZED)
    }
    if (!payload.exp) throw new ResponseError('Expired token', StatusCodes.BAD_REQUEST)
    const user = await authRepo.findOne({ email: payload.email })
    if (!user || payload.exp * 1000 < Date.now())
      throw new ResponseError('Invalid access token', StatusCodes.BAD_REQUEST)
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}

const verifyRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies['refreshToken']
    if (!refreshToken) throw new ResponseError('Missing refresh token', StatusCodes.UNAUTHORIZED)
    const payload = decodeRefreshToken(refreshToken)
    if (!payload) {
      throw new ResponseError('Invalid refresh token', StatusCodes.UNAUTHORIZED)
    }
    const founded = await authRepo.findOne({ email: payload.email }, { lean: true })
    if (!founded) throw new ResponseError('Invalid refresh token', StatusCodes.BAD_REQUEST)
    req.user = founded
    next()
  } catch (error) {
    next(error)
  }
}

export { verifyAccessToken, verifyRefreshToken }
