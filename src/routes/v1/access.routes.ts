import express from 'express'

import { asyncHandler } from '~/helper'
import AccessController = require('~/controllers/access.controller')

const accessRoutes = express.Router()

accessRoutes.route('/signup').post(asyncHandler(AccessController.signUp))
accessRoutes.route('/login').post(asyncHandler(AccessController.login))

export default accessRoutes
