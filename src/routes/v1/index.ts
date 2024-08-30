import express from 'express'

import accessRoutes from './access.routes'
import { apiKey } from '~/middlewares/apiKey.middleware'
import categoryRoutes from './category.routes'
import attributeRoutes from './attribute.routes'
import productRoutes from './product.routes'

const Router = express.Router()

Router.use(apiKey)

Router.use('/access', accessRoutes)
Router.use('/category', categoryRoutes)
Router.use('/attribute', attributeRoutes)
Router.use('/product', productRoutes)

export default Router
