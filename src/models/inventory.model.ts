import mongoose from 'mongoose'
import { IInventoryModel } from './interfaces/IInventory.interface'

const InventorySchema = new mongoose.Schema<IInventoryModel>(
  {
    productVariant: { type: mongoose.Schema.Types.ObjectId, ref: 'productVariant', required: true },
    quantity: { type: Number, default: 0 }
  },
  { timestamps: true }
)

export default mongoose.model<IInventoryModel>('inventory', InventorySchema)
