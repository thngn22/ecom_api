import express from 'express'

import authRoutes from './authRoutes'

const Router = express.Router()

Router.use('/auth', authRoutes)

export default Router
