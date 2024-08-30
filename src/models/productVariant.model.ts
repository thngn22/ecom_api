import mongoose from 'mongoose'
import { IProductVariantModel } from './interfaces/IProductVariant.interface'

const ProductVariantSchema = new mongoose.Schema<IProductVariantModel>(
  {
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
    attributeValues: [
      {
        attribute: { type: mongoose.Schema.Types.ObjectId, ref: 'attribute', required: true },
        value: { type: String, required: true }
      }
    ],
    price: { type: Number, required: true }
    //   sku: { type: String, required: true, unique: true }
  },
  { timestamps: true }
)
export default mongoose.model<IProductVariantModel>('productVariant', ProductVariantSchema)
