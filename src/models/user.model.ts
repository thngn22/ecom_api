import mongoose = require('mongoose')
import IUserModel = require('./interfaces/IUser.interface')

const UserSchema = new mongoose.Schema(
  {
    auth_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'auth' },
    name: { type: String, required: true, trim: true, maxlength: 150 },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
)

const UserModel = mongoose.model<IUserModel>('user', UserSchema)

export = UserModel
