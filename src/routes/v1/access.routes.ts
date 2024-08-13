import express from 'express'
import passport from '~/lib/passport'

import { asyncHandler } from '~/helper'
import AccessController = require('~/controllers/access.controller')

const accessRoutes = express.Router()

accessRoutes.route('/signup').post(asyncHandler(AccessController.signUp))
accessRoutes
  .route('/login')
  .post(passport.authenticate('local', { session: false }), asyncHandler(AccessController.login))
accessRoutes
  .route('/logout')
  .post(passport.authenticate('jwt', { session: false }), asyncHandler(AccessController.logout))

export default accessRoutes
