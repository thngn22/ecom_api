import mongoose = require('mongoose')
import IUserModel = require('./interfaces/IUser.interface')

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 150 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
    verify: { type: Boolean, default: false },
    roles: { type: [String], default: [] }
  },
  { timestamps: true }
)

const UserModel = mongoose.model<IUserModel>('user', UserSchema)

export = UserModel
