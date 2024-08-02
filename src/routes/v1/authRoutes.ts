import express, { Request, Response, NextFunction, Express } from 'express'
const AuthController = require('~/controllers/auth.controller')

const authRoutes = express.Router()

authRoutes.route('/signup').post(AuthController.signUp)

module.exports = authRoutes
