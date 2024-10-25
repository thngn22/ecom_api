import mongoose from 'mongoose'
import ICategoryModel from './interfaces/ICategory.interface'

const CategorySchema = new mongoose.Schema<ICategoryModel>(
  {
    attributes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'attribute' }],
    name: { type: String, required: true, unique: true },
    root_id: { type: String, required: true },
    parent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
    image: { type: String },
    is_publish: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
    left: { type: Number, default: 0 },
    right: { type: Number, default: 0 }
  },
  { timestamps: true }
)

export default mongoose.model<ICategoryModel>('category', CategorySchema)

