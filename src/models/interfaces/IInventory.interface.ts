import mongoose from 'mongoose'

export interface IInventoryModel extends mongoose.Document {
  productVariant: mongoose.Types.ObjectId
  quantity: number
}
