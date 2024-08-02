import mongoose = require('mongoose')

interface AuthModel extends mongoose.Document {
  name: string
  email: string
  password: string
}

export = AuthModel
