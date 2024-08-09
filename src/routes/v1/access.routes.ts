import express from 'express'

import { asyncHandler } from '~/helper'
import AccessController = require('~/controllers/access.controller')

const accessRoutes = express.Router()

accessRoutes.route('/signup').post(asyncHandler(AccessController.signUp))

export default accessRoutes
