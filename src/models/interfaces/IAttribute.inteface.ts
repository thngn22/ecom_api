import mongoose = require('mongoose')

interface IAttributeModel extends mongoose.Document {
  name: string
  type: 'string' | 'number' | 'array' | 'object'
  required: boolean
}

export = IAttributeModel
