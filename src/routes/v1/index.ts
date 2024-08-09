import express from 'express'

import accessRoutes from './access.routes'
import { apiKey } from '~/middlewares/apiKey.middleware'

const Router = express.Router()

Router.use(apiKey)

Router.use('/access', accessRoutes)

export default Router
