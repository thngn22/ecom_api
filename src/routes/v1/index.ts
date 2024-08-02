import express from 'express'
const authRoutes = require('./authRoutes')

const Router = express.Router()

Router.use('/auth', authRoutes)

module.exports = Router
