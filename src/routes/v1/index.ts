import express from 'express'

import accessRoutes from './access.routes'
import { apiKey } from '~/middlewares/apiKey.middleware'
import categoryRoutes from './category.routes'

const Router = express.Router()

Router.use(apiKey)

Router.use('/access', accessRoutes)
Router.use('/category', categoryRoutes)

export default Router
