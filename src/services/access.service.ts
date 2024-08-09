import mongoose = require('mongoose')
import bcrypt = require('bcrypt')

import UserRepository = require('~/repositories/user.repo')
import AuthRepository = require('~/repositories/auth.repo')

import { getIntoData } from '~/utils/objects'
import ResponseError from '~/core/response.error'
import StatusCodes from '~/utils/statusCodes'
import ReasonPhrases from '~/utils/reasonPhrases'

interface SignUpInput {
  name: string
  email: string
  password: string
}

class AccessService {
  private static authRepo = new AuthRepository()
  private static userRepo = new UserRepository()

  static signUp = async ({ name, email, password }: SignUpInput) => {
    const existAuth = await this.authRepo.findOne({ email: email }, { lean: true })
    if (existAuth) {
      // Nếu tài khoản đã tồn tại, quăng lỗi Conflict
      throw new ResponseError(StatusCodes.CONFLICT, ReasonPhrases.CONFLICT)
    }

    const passwordHash = await bcrypt.hashSync(password, 10)
    const newAuth = await this.authRepo.create({ email, password: passwordHash })
    if (!newAuth) {
      // Nếu việc tạo mới không thành công, trả về lỗi nội bộ server
      throw new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR)
    }

    const newUser = await this.userRepo.create({
      auth_id: newAuth._id as mongoose.Schema.Types.ObjectId,
      name,
      email
    })

    return {
      name: newUser.name,
      ...getIntoData({ fields: ['email', 'verified', 'roles', '_id'], object: newAuth })
    }
  }
}

export = AccessService
