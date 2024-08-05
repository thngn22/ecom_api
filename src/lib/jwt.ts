import JWT = require('jsonwebtoken')
import crypto = require('crypto')

const genPairToken = async (
  payload: string | object,
  publicKey: JWT.Secret | JWT.GetPublicKeyOrSecret,
  privateKey: string,
  passphrase: string
) => {
  try {
    // Giải mã khóa riêng bằng passphrase
    const decryptedPrivateKey = crypto.createPrivateKey({
      key: privateKey,
      format: 'pem',
      passphrase: passphrase
    })

    const accessToken = await JWT.sign(payload, decryptedPrivateKey, {
      algorithm: 'RS256',
      expiresIn: '15m'
    })
    const refreshToken = await JWT.sign(payload, decryptedPrivateKey, {
      algorithm: 'RS256',
      expiresIn: '7d'
    })

    JWT.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.log(`>>> Error verify:: `, err)
      } else {
        console.log(`>>> Decode verify:: `, decode)
      }
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
