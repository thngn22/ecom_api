import mongoose = require('mongoose')
import bcrypt = require('bcrypt')

import UserRepository = require('~/repositories/user.repo')
import AuthRepository from '~/repositories/auth.repo'

import { getIntoData } from '~/utils/objects'
import ResponseError from '~/core/response.error'
import StatusCodes from '~/utils/statusCodes'
import ReasonPhrases from '~/utils/reasonPhrases'
import { genPairToken } from '~/lib/jwt'

interface SignUpInput {
  name: string
  email: string
  password: string
}

class AccessService {
  static signUp = async ({ name, email, password }: SignUpInput) => {
    console.log('vao dc service')

    const existAuth = await AuthRepository.findOne({ email: email }, { lean: true })
    if (existAuth) {
      // Nếu tài khoản đã tồn tại, quăng lỗi Conflict
      throw new ResponseError(StatusCodes.CONFLICT, ReasonPhrases.CONFLICT)
    }

    const passwordHash = await bcrypt.hashSync(password, 10)
    const newAuth = await AuthRepository.create({ email, password: passwordHash })
    if (!newAuth) {
      // Nếu việc tạo mới không thành công, trả về lỗi nội bộ server
      throw new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR)
    }

    const newUser = await UserRepository.create({
      auth_id: newAuth._id as mongoose.Schema.Types.ObjectId,
      name,
      email
    })

    return {
      ...getIntoData({ fields: ['_id', 'email', 'verified', 'roles'], object: newAuth }),
      name: newUser.name
    }
  }

  /*
    1 - check email
    2 - match password
    3 - create access & refreshToken, and save then
    4 - update refreshTokenUsed, and render tokens to response
   */
  static login = async ({ email, password }: SignUpInput) => {
    const found = await AuthRepository.findOne({ email: email }, { lean: true })
    if (!found) {
      throw new ResponseError(StatusCodes.NOT_FOUND, "User's email or password is incorrect")
    }

    const math = await bcrypt.compareSync(password, found.password)
    if (!math) {
      throw new ResponseError(StatusCodes.BAD_REQUEST, "User's email or password is incorrect")
    }

    const tokens = await genPairToken({ id: found._id, email: found.email })
    const updateRefreshTokenUsed = [tokens.refreshToken, ...found.refresh_token_used]
    if (found.refresh_token_used.length >= 15) {
      updateRefreshTokenUsed.pop()
    }

    AuthRepository.findOneAndUpdate(
      { _id: found._id },
      { refresh_token: tokens.refreshToken, refresh_token_used: updateRefreshTokenUsed }
    )

    return tokens
  }

  static logout = async (email: string) => {
    const result = AuthRepository.deleteRefreshToken({ email: email }, { refresh_token: '' })
    if (!result) throw new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR)

    return true
  }
}

export = AccessService
