import mongoose = require('mongoose')
import ICategoryModel = require('./interfaces/ICategory.interface')

const CategorySchema = new mongoose.Schema<ICategoryModel>(
  {
    name: { type: String, required: true, unique: true },
    root_id: { type: String, required: true },
    parent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
    image: { type: String },
    left: { type: Number, default: 0 },
    right: { type: Number, default: 0 }
  },
  { timestamps: true }
)

const CategoryModel = mongoose.model<ICategoryModel>('category', CategorySchema)

export = CategoryModel
