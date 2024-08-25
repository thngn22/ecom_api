import express from 'express'

import { asyncHandler } from '~/helper'
import { verifyAccessToken } from '~/middlewares/jwt.middleware'
import onlyRole from '~/middlewares/role.middleware'
import validate from '~/middlewares/validate.middleware'

import categorySchema from '~/schema/category.schema'
import CategoryController from '~/controllers/category.controller'

const categoryRoutes = express.Router()

categoryRoutes.route('').get(
  validate({
    body: categorySchema.getChildCategory
  }),
  asyncHandler(CategoryController.getChildCategory)
)

//Permission ADMIN
categoryRoutes.use(verifyAccessToken, onlyRole(['ADMIN']))
categoryRoutes.route('').post(
  validate({
    body: categorySchema.create
  }),
  asyncHandler(CategoryController.createCate)
)

categoryRoutes.route('/:id').put(
  validate({
    params: categorySchema.categoryId,
    body: categorySchema.update
  }),
  asyncHandler(CategoryController.updateCate)
)

categoryRoutes.route('/:id').delete(
  validate({
    params: categorySchema.categoryId
  }),
  asyncHandler(CategoryController.deleteCate)
)

export default categoryRoutes
