import express from 'express'
import passport from '~/lib/passport'

import { asyncHandler } from '~/helper'
import { verifyAccessToken, verifyRefreshToken } from '~/middlewares/jwt.middleware'
import AccessController = require('~/controllers/access.controller')

const accessRoutes = express.Router()

accessRoutes.route('/signup').post(asyncHandler(AccessController.signUp))

accessRoutes
  .route('/login')
  .post(passport.authenticate('local', { session: false }), asyncHandler(AccessController.login))

accessRoutes.route('/refresh').post(verifyRefreshToken, asyncHandler(AccessController.refresh))

accessRoutes.use(verifyAccessToken)
accessRoutes.route('/logout').post(asyncHandler(AccessController.logout))

export default accessRoutes
