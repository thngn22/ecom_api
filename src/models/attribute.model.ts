import mongoose = require('mongoose')
import IAttributeModel = require('./interfaces/IAttribute.inteface')

const AttributeSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, unique: true },
    type: { type: String, require: true },
    require: { type: Boolean, default: false },
    category_orderIds: [{ type: mongoose.Schema.Types.ObjectId, default: [], ref: 'category' }],
    is_publish: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false }
  },
  { timestamps: true }
)

const AttributeModel = mongoose.model<IAttributeModel>('attribute', AttributeSchema)

export = AttributeModel
