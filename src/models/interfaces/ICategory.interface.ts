import mongoose from 'mongoose'

interface ICategoryModel extends mongoose.Document {
  attributes: Array<mongoose.Schema.Types.ObjectId>
  name: string
  root_id: string
  image: string
  parent_id: mongoose.Schema.Types.ObjectId | null
  is_publish: boolean
  is_deleted: boolean
  left: number
  right: number
}

export default ICategoryModel
