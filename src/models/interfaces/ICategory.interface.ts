import mongoose = require('mongoose')

interface ICategoryModel extends mongoose.Document {
  name: string
  root_id: string
  image: string
  parent_id: mongoose.Schema.Types.ObjectId | null
  left: number
  right: number
}

export = ICategoryModel
