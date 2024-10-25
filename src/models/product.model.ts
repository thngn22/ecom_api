import mongoose from 'mongoose'
import IProductModel from './interfaces/IProduct.interface'

const ProductSchema = new mongoose.Schema<IProductModel>(
  {
    name: { type: String, required: true },
    description: { type: String },
    variant_orderIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'productVariant' }],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'category', required: true },
    basePrice: { type: Number, required: true },
    attributes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'attribute' }],
    inventory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'inventory' }]
  },
  { timestamps: true }
)

export default mongoose.model<IProductModel>('product', ProductSchema)
