import express from 'express'

import accessRoutes from './access.routes'

const Router = express.Router()

Router.use('/access', accessRoutes)

export default Router
