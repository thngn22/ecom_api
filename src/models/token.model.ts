import mongoose = require('mongoose')
import ITokenModel = require('./interfaces/IToken.interface')

const TokenSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
    publicKey: { type: String, required: true },
    refreshToken: { type: [String], default: [] }
  },
  { timestamps: true }
)

const TokenModel = mongoose.model<ITokenModel>('token', TokenSchema)

export = TokenModel
