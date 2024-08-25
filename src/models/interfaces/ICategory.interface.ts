import mongoose = require('mongoose')

interface ICategoryModel extends mongoose.Document {
  attributes: Array<mongoose.Schema.Types.ObjectId>
  name: string
  root_id: string
  image: string
  parent_id: mongoose.Schema.Types.ObjectId | null
  left: number
  right: number
}

export = ICategoryModel
