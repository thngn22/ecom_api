import express from 'express'

import { asyncHandler } from '~/helper'
import { verifyAccessToken } from '~/middlewares/jwt.middleware'
import CategoryController = require('~/controllers/category.controller')
import onlyRole from '~/middlewares/role.middleware'

const categoryRoutes = express.Router()

categoryRoutes.route('').get(asyncHandler(CategoryController.getChildCategory))

//Author ADMIN
categoryRoutes.use(verifyAccessToken, onlyRole(['ADMIN']))
categoryRoutes.route('').post(asyncHandler(CategoryController.createCate))

export default categoryRoutes
