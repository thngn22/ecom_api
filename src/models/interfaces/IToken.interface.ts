import mongoose = require('mongoose')

interface ITokenModel extends mongoose.Document {
  userId: mongoose.Schema.Types.ObjectId
  publicKey: string
  refreshToken: string[]
}

export = ITokenModel
