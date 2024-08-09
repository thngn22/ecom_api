import mongoose = require('mongoose')
import IApiKeyModel = require('./interfaces/IApiKey.interface')

const ApiKeySchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    status: { type: Boolean, default: true },
    permission: { type: [String], require: true, enum: ['0000', '1111', '2222'] }
  },
  { timestamps: true }
)

const ApiKEyModel = mongoose.model<IApiKeyModel>('api_key', ApiKeySchema)

export = ApiKEyModel
