import { Request, Response, NextFunction } from 'express'
import ResponseError from '~/core/response.error'

import { decodeRefreshToken } from '~/lib/jwt'
import StatusCodes from '~/utils/statusCodes'
import authRepo from '~/repositories/auth.repo'

const verifyRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
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
}

export { verifyRefreshToken }
