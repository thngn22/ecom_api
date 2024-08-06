import mongoose = require('mongoose')
import bcrypt = require('bcrypt')

import UserRepository = require('~/repositories/user.repo')
import AuthRepository = require('~/repositories/auth.repo')

import { genPairToken } from '~/lib/jwt'
import { getIntoData } from '~/utils/objects'

interface SignUpInput {
  name: string
  email: string
  password: string
}

class AccessService {
  private static authRepo = new AuthRepository()
  private static userRepo = new UserRepository()

  static signUp = async ({ name, email, password }: SignUpInput) => {
    try {
      const existAuth = await this.authRepo.findOne({ email: email }, { lean: true })
      if (existAuth) {
        return {
          code: 'xxx',
          message: 'Existed account'
        }
      }

      const passwordHash = await bcrypt.hashSync(password, 10)
      const newAuth = await this.authRepo.create({ email, password: passwordHash })
      if (!newAuth) {
        return {
          code: 401,
          message: 'Failure to signup!!!'
        }
      }

      const newUser = await this.userRepo.create({
        auth_id: newAuth._id as mongoose.Schema.Types.ObjectId,
        name,
        email
      })

      return {
        code: 201,
        data: {
          name: newUser.name,
          ...getIntoData({ fields: ['email', 'verified', 'roles', '_id'], object: newAuth })
        }
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
