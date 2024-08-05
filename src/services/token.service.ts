import mongoose = require('mongoose')
import JWT = require('jsonwebtoken')
import TokenRepository from '~/repositories/token.repo'

interface TokensInput {
  userId: mongoose.Schema.Types.ObjectId
  publicKey: JWT.Secret | JWT.GetPublicKeyOrSecret
}

class TokenService {
  private static tokenRepo = new TokenRepository()

  static createToKen = async ({ userId, publicKey }: TokensInput) => {
    try {
      const publicKeyString = publicKey.toString()
      const tokens = await this.tokenRepo.create({
        userId: userId,
        publicKey: publicKeyString
      })

      return tokens ? publicKeyString : null
    } catch (error) {
      const err = error as Error
      return {
        code: 'xxx',
        message: err.message,
        status: 'error'
      }
    }
  }
}

export = TokenService
