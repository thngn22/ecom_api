import mongoose = require('mongoose')
import IAttributeModel = require('./interfaces/IAttribute.inteface')

const AttributeSchema = new mongoose.Schema(
  {
    attributes: { type: mongoose.Schema.Types.Mixed, required: true }
  },
  { timestamps: true }
)

const AttributeModel = mongoose.model<IAttributeModel>('attribute', AttributeSchema)

export = AttributeModel
