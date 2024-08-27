import mongoose = require('mongoose')

interface IAttributeModel extends mongoose.Document {
  name: string
  type: 'string' | 'number' | 'array' | 'object'
  require: boolean
  category_orderIds: Array<mongoose.Schema.Types.ObjectId>
  is_publish: boolean
  is_deleted: boolean
}

export = IAttributeModel
