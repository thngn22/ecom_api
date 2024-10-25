import express from 'express'

import { asyncHandler } from '~/helper'
import { verifyAccessToken } from '~/middlewares/jwt.middleware'
import onlyRole from '~/middlewares/role.middleware'
import validate from '~/middlewares/validate.middleware'

// import productSchema from '~/schema/product.schema'
import ProductController from '~/controllers/product.controller'

const productRoutes = express.Router()

//Verify accessToken
productRoutes.use(verifyAccessToken)

//Permission ADMIN,SHOP only
productRoutes.use(onlyRole(['ADMIN', 'SHOP']))

productRoutes.route('').post(
  onlyRole(['ADMIN']),
//   validate({
//     body: attributeSchema.create
//   }),
  asyncHandler(ProductController.createProduct)
)

// productRoutes.route('/:id').put(
//   onlyRole(['ADMIN']),
//   validate({
//     params: attributeSchema.attributeId,
//     body: attributeSchema.update
//   }),
//   asyncHandler(ProductController.updateProduct)
// )

// productRoutes.route('/:id').delete(
//   onlyRole(['ADMIN']),
//   validate({
//     params: attributeSchema.attributeId
//   }),
//   asyncHandler(ProductController.deleteProduct)
// )

export default productRoutes
