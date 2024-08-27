import express from 'express'

import { asyncHandler } from '~/helper'
import { verifyAccessToken } from '~/middlewares/jwt.middleware'
import onlyRole from '~/middlewares/role.middleware'
import validate from '~/middlewares/validate.middleware'

import attributeSchema from '~/schema/attribute.schema'
import AttributeController from '~/controllers/attribute.controller'

const attributeRoutes = express.Router()

//Verify accessToken
attributeRoutes.use(verifyAccessToken)

//Permission ADMIN,SHOP only
attributeRoutes.route('').get(onlyRole(['ADMIN', 'SHOP']), asyncHandler(AttributeController.getAllAttributes))

//Permission ADMIN only
attributeRoutes.route('').post(
  onlyRole(['ADMIN']),
  validate({
    body: attributeSchema.create
  }),
  asyncHandler(AttributeController.createAttribute)
)

attributeRoutes.route('/:id').put(
  onlyRole(['ADMIN']),
  validate({
    params: attributeSchema.attributeId,
    body: attributeSchema.update
  }),
  asyncHandler(AttributeController.updateAttribute)
)

attributeRoutes.route('/:id').delete(
  onlyRole(['ADMIN']),
  validate({
    params: attributeSchema.attributeId
  }),
  asyncHandler(AttributeController.deleteAttribute)
)

export default attributeRoutes
