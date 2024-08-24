import express from 'express'

import { asyncHandler } from '~/helper'
import { verifyAccessToken } from '~/middlewares/jwt.middleware'
import onlyRole from '~/middlewares/role.middleware'
import validate from '~/middlewares/validate.middleware'

import categorySchema from '~/schema/category.schema'
import CategoryController = require('~/controllers/category.controller')

const categoryRoutes = express.Router()

categoryRoutes.route('').get(asyncHandler(CategoryController.getChildCategory))

//Permission ADMIN
categoryRoutes.use(verifyAccessToken, onlyRole(['ADMIN']))
categoryRoutes.route('').post(
  validate({
    body: categorySchema.create
  }),
  asyncHandler(CategoryController.createCate)
)

export default categoryRoutes
