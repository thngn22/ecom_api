import mongoose = require('mongoose')
import bcrypt = require('bcrypt')
import { Request, Response } from 'express'

import UserRepository = require('~/repositories/user.repo')
import AuthRepository from '~/repositories/auth.repo'

import { getIntoData } from '~/utils/objects'
import ResponseError from '~/core/response.error'
import StatusCodes from '~/utils/statusCodes'
import ReasonPhrases from '~/utils/reasonPhrases'
import { genPairToken, decodeRefreshToken } from '~/lib/jwt'
import IAuthModel from '~/models/interfaces/IAuth.interface'

interface SignUpInput {
  name: string
  email: string
  password: string
}

class AccessService {
  static signUp = async ({ name, email, password }: SignUpInput) => {
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
    1 - create access & refreshToken, and save then
    2 - update refreshTokenUsed, and render tokens to response
   */
  static login = async (user: IAuthModel, res: Response) => {
    const tokens = await genPairToken({ id: user.id, email: user.email })
    const updateRefreshTokenUsed = [tokens.refreshToken, ...user.refresh_token_used]

    if (user.refresh_token_used.length >= 15) {
      updateRefreshTokenUsed.pop()
    }

    await AuthRepository.findOneAndUpdate(
      { _id: user._id },
      {
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken,
        refresh_token_used: updateRefreshTokenUsed
      }
    )

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: false, // use 'true' for HTTPS
      sameSite: 'strict', // Giảm thiểu tấn công CSRF
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 ngày
    })

    return { accessToken: tokens.accessToken }
  }

  static logout = async (user: IAuthModel, req: Request, res: Response) => {
    const accessToken = req.headers['authorization'] as string
    if (!accessToken) throw new ResponseError(StatusCodes.BAD_REQUEST, 'Missing token')

    if (accessToken.split(' ')[1] !== user.access_token)
      throw new ResponseError(StatusCodes.BAD_REQUEST, 'Token was removed')

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: false,
      sameSite: 'strict'
    })

    const result = AuthRepository.deleteRefreshToken({ email: user.email }, { access_token: '', refresh_token: '' })
    if (!result) throw new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR)

    return true
  }

  static refresh = async (user: IAuthModel, res: Response) => {
    const tokens = await genPairToken({ id: user.id, email: user.email })
    const updateRefreshTokenUsed = [tokens.refreshToken, ...user.refresh_token_used]

    if (user.refresh_token_used.length >= 15) {
      updateRefreshTokenUsed.pop()
    }

    await AuthRepository.findOneAndUpdate(
      { _id: user._id },
      {
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken,
        refresh_token_used: updateRefreshTokenUsed
      }
    )

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: false, // use 'true' for HTTPS
      sameSite: 'strict', // Giảm thiểu tấn công CSRF
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 ngày
    })

    return { accessToken: tokens.accessToken }
  }
}

export = AccessService
