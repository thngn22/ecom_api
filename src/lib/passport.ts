import bcrypt from 'bcrypt'
import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { Strategy as LocalStrategy } from 'passport-local'

import env from '~/configs/environments'
import ResponseError from '~/core/response.error'
import StatusCodes from '~/utils/statusCodes'
import ReasonPhrases from '~/utils/reasonPhrases'

import AuthRepositories from '~/repositories/auth.repo'
import IAuthModel from '~/models/interfaces/IAuth.interface'

passport.use(
  new LocalStrategy(
    {
      passwordField: 'password',
      usernameField: 'email',
      session: false
    },
    async (email: string, password: string, done: (error: any, user?: IAuthModel | boolean) => void) => {
      try {
        const existedUserLogin = await AuthRepositories.findOne({ email: email }, { lean: true })
        if (existedUserLogin) {
          const isMatch = bcrypt.compareSync(password, existedUserLogin.password)
          if (!isMatch) {
            return done(new ResponseError(StatusCodes.BAD_REQUEST, 'Invalid email/password'))
          }
          return done(null, existedUserLogin)
        }
        return done(new ResponseError(StatusCodes.BAD_REQUEST, 'Invalid email/password'))
      } catch (error) {
        return done(error)
      }
    }
  )
)

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.JWT_ACCESS_SECRET,
      algorithms: ['HS256']
    },
    async (payload: { email: string; exp: number }, done: (error: any, user?: IAuthModel | boolean) => void) => {
      try {
        console.log('>>> payload::', payload);
        
        if (!payload.email) return done(new ResponseError(StatusCodes.BAD_REQUEST, 'Email not existed'))

        const user = await AuthRepositories.findOne({ email: payload.email }, { lean: true })
        if (!user || payload.exp * 1000 < Date.now()) {
          return done(new ResponseError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST))
        }

        return done(null, user)
      } catch (error) {
        return done(error)
      }
    }
  )
)

export default passport
