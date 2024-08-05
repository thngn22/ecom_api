import mongoose = require('mongoose')
import bcrypt = require('bcrypt')
import crypto = require('crypto')

import TokenService from './token.service'

import UserRepository = require('~/repositories/user.repo')

import { genPairToken } from '~/lib/jwt'

interface SignUpInput {
  name: string
  email: string
  password: string
  status: 'active' | 'inactive'
  verify: boolean
  roles: string[]
  createdAt: Date
  updatedAt: Date
}

class AccessService {
  private static userRepo = new UserRepository()

  static signUp = async ({ name, email, password, status, verify, roles }: SignUpInput) => {
    try {
      const existUser = await this.userRepo.findOne({ email: email }, { lean: true })
      if (existUser) {
        return {
          code: 'xxx',
          message: 'Existed User'
        }
      }

      const passwordHash = await bcrypt.hashSync(password, 10)

      const newUser = await this.userRepo.create({ name, email, password: passwordHash, status, verify, roles })
      if (newUser) {
        const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
          },
          privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
            cipher: 'aes-256-cbc',
            passphrase: 'top secret'
          }
        })

        const publicKeyString = await TokenService.createToKen({
          userId: newUser._id as mongoose.Schema.Types.ObjectId,
          publicKey: publicKey
        })
        if (!publicKeyString) {
          return {
            code: 'xxx',
            message: 'create publicKeyString errro!!!'
          }
        }

        const tokens = await genPairToken(
          {
            userId: newUser._id,
            email
          },
          publicKey,
          privateKey,
          'top secret'
        )

        return {
          code: 201,
          metadata: {
            user: newUser,
            tokens: tokens
          }
        }
      }

      return {
        code: 401,
        metadata: null
      }
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

export = AccessService
