import JWT = require('jsonwebtoken')
import env from '~/configs/environments'

const genPairToken = async (
  payload: string | object
) => {
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

export { genPairToken }
