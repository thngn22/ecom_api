import express from 'express'

import AuthController = require('~/controllers/auth.controller')

const authRoutes = express.Router()

authRoutes.route('/signup').post(AuthController.signUp)

export default authRoutes
