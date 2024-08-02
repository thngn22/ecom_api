import mongoose = require('mongoose');
import IAuthModel = require('./interfaces/IAuth.interface');

const AuthSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const AuthModel = mongoose.model<IAuthModel>('auth', AuthSchema);

export = AuthModel;
