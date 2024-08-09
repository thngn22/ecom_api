import mongoose = require('mongoose')

interface IAuthModel extends mongoose.Document {
  email: string
  password: string
  verified: boolean
  roles: string[]
  refresh_token: string
  refresh_token_used: string[]
}

export = IAuthModel
