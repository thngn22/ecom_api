import { Request, Response, NextFunction } from 'express'
import ResponseError from '~/core/response.error'

import { decodeRefreshToken } from '~/lib/jwt'
import StatusCodes from '~/utils/statusCodes'
import authRepo from '~/repositories/auth.repo'

// const verifyAccessToken = async (req, res, next) => {
// 	const accessToken = req.headers["Authorization"]
// 	if (!accessToken) throw new UnauthorizedError("Missing access token")
// 	const payload = decodeAccessToken(accessToken.split(" ")[1])
// 	const userLogin = await userLoginRepo.findByEmail(payload.email)
// 	if (!userLogin) throw new BadRequestError("Invalid access token")
// 	req.user = userLogin
// 	next()
// }

const verifyRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies['refreshToken']
  if (!refreshToken) throw new ResponseError(StatusCodes.UNAUTHORIZED, 'Missing refresh token')
  const payload = decodeRefreshToken(refreshToken)
  if (!payload) {
    throw new ResponseError(StatusCodes.UNAUTHORIZED, 'Invalid refresh token')
  }
  const founded = await authRepo.findOne({ email: payload.email }, { lean: true })
  if (!founded) throw new ResponseError(StatusCodes.BAD_REQUEST, 'Invalid refresh token')
  req.user = founded
  next()
}

export { verifyRefreshToken }
