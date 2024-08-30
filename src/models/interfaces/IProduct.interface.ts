import mongoose from 'mongoose'

interface IProductModel extends mongoose.Document {
  name: string
  description: string
  category: mongoose.Types.ObjectId
  basePrice: number
  attributes: mongoose.Types.ObjectId[]
  variant_orderIds: mongoose.Types.ObjectId[]
  inventory: mongoose.Types.ObjectId[]
}

export default IProductModel
