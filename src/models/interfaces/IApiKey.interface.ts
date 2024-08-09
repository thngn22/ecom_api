import mongoose = require('mongoose')

interface IApiKeyModel extends mongoose.Document {
  key: string
  status: boolean
  permission: string[]
}

export = IApiKeyModel
