import mongoose = require('mongoose')
import IAuthModel = require('./interfaces/IAuth.interface')

const AuthSchema = new mongoose.Schema<IAuthModel>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    roles: { type: [String], default: ['user'] },
    refresh_token: { type: String, default: '' },
    refresh_token_used: { type: [String], default: [] }
  },
  { timestamps: true }
)

const AuthModel = mongoose.model<IAuthModel>('Auth', AuthSchema)

export = AuthModel
