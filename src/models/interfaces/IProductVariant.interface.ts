import mongoose from 'mongoose'

export interface IProductVariantModel extends mongoose.Document {
  product_id: mongoose.Types.ObjectId
  attributeValues: {
    attribute: mongoose.Types.ObjectId
    value: string
  }[]
  price: number
  //   sku: string
}
