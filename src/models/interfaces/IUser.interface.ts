import mongoose = require('mongoose')

interface IUserModel extends mongoose.Document {
  auth_id: mongoose.Schema.Types.ObjectId
  name: string
  email: string
}

export = IUserModel
