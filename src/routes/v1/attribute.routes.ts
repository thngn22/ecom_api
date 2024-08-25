import express from 'express'

import { asyncHandler } from '~/helper'
import { verifyAccessToken } from '~/middlewares/jwt.middleware'
import onlyRole from '~/middlewares/role.middleware'
import validate from '~/middlewares/validate.middleware'

import attributeSchema from '~/schema/attribute.schema'
import attributeController from '~/controllers/attribute.controller'

const attributeRoutes = express.Router()

// categoryRoutes.route('').get(
//   validate({
//     body: categorySchema.getChildCategory
//   }),
//   asyncHandler(CategoryController.getChildCategory)
// )

//Permission ADMIN
attributeRoutes.use(verifyAccessToken, onlyRole(['ADMIN']))
attributeRoutes.route('').post(
  validate({
    body: attributeSchema.create
  }),
  asyncHandler(attributeController.createAttribute)
)

// categoryRoutes.route('/:id').put(
//   validate({
//     params: categorySchema.categoryId,
//     body: categorySchema.update
//   }),
//   asyncHandler(CategoryController.updateCate)
// )

// categoryRoutes.route('/:id').delete(
//   validate({
//     params: categorySchema.categoryId
//   }),
//   asyncHandler(CategoryController.deleteCate)
// )

export default attributeRoutes
