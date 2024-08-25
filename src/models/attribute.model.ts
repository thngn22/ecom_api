import mongoose = require('mongoose')
import IAttributeModel = require('./interfaces/IAttribute.inteface')

const AttributeSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    type: { type: String, require: true },
    require: { type: Boolean, default: false }
  },
  { timestamps: true }
)

const AttributeModel = mongoose.model<IAttributeModel>('attribute', AttributeSchema)

export = AttributeModel
