import express from 'express'

import AccessController = require('~/controllers/access.controller')

const accessRoutes = express.Router()

accessRoutes.route('/signup').post(AccessController.signUp)

export default accessRoutes
