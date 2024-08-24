import JWT = require('jsonwebtoken')
import env from '~/configs/environments'
import IPayloadJWT from './types/jwt.interface'

const genPairToken = async (payload: IPayloadJWT) => {
  try {
    const accessToken = JWT.sign(payload, env.JWT_ACCESS_SECRET, {
      algorithm: 'HS256',
      expiresIn: '15m'
    })
    const refreshToken = JWT.sign(payload, env.JWT_REFRESH_SECRET, {
      algorithm: 'HS256',
      expiresIn: '7d'
    })

    return {
      accessToken,
      refreshToken
    }
  } catch (error) {
    console.error(`Error generating token pair: `, error)
    throw error
  }
}

const decodeAccessToken = (token: string): IPayloadJWT | null => {
  try {
    return JWT.verify(token, env.JWT_ACCESS_SECRET, {
      algorithms: ['HS256']
    }) as IPayloadJWT
  } catch {
    return null
  }
}

const decodeRefreshToken = (token: string): IPayloadJWT | null => {
  try {
    return JWT.verify(token, env.JWT_REFRESH_SECRET, {
      algorithms: ['HS256']
    }) as IPayloadJWT
  } catch {
    return null
  }
}

export { genPairToken, decodeAccessToken, decodeRefreshToken }
