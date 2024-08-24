import express from 'express'
import passport from '~/lib/passport'

import { asyncHandler } from '~/helper'
import { verifyRefreshToken } from '~/middlewares/jwt.middleware'
import CategoryController = require('~/controllers/category.controller')

const categoryRoutes = express.Router()

categoryRoutes.use(passport.authenticate('jwt', { session: false }))

categoryRoutes.route('').post(asyncHandler(CategoryController.createCate))

export default categoryRoutes
