import mongoose from 'mongoose'
import MongoDBOptions from '../interfaces/types/MongoDBOptions'
import PaginateOptions from '../interfaces/types/PaginateOptions'
import Read from '../interfaces/base/Read'
import Write from '../interfaces/base/Write'

class RepositoryBase<T extends mongoose.Document> implements Read<T>, Write<T> {
  private _model: mongoose.Model<T>
  private defaultOption: MongoDBOptions

  constructor(schemaModel: mongoose.Model<T>) {
    this._model = schemaModel
    this.defaultOption = {
      select: [],
      unselect: ['_v', 'is_deleted'],
      sort: 'ctime'
    }
  }

  private createSelectFilter(options: MongoDBOptions): any {
    const select = options.select || []
    const unselect = options.unselect || []
    const selectFilter: any = {}

    if (select.length > 0) {
      select.forEach((field) => (selectFilter[field] = 1))
    } else if (unselect.length > 0) {
      unselect.forEach((field) => (selectFilter[field] = 0))
    }

    return selectFilter
  }

  async create(item: Partial<T>): Promise<T> {
    try {
      const data = await this._model.create([item])
      return data[0]
    } catch (error) {
      throw error
    }
  }

  async createMany(items: Partial<T>[]): Promise<T[]> {
    try {
      return await this._model.create(items)
    } catch (error) {
      throw error
    }
  }

  async findById(_id: string | null, options?: MongoDBOptions): Promise<T | null> {
    const findOptions = { ...this.defaultOption, ...options }
    const query = this._model.findById(_id).select(this.createSelectFilter(findOptions)).sort(findOptions.sort)

    return query.exec()
  }

  async findOne(conditions: mongoose.FilterQuery<T>, options?: MongoDBOptions): Promise<T | null> {
    const findOptions = { ...this.defaultOption, ...options }
    let query = this._model
      .findOne({
        ...conditions,
        is_deleted: { $ne: true }
      })
      .select(this.createSelectFilter(findOptions))
      .sort(findOptions.sort)

    if (findOptions.select) {
      query = query.select(findOptions.select.join(' '))
    }

    return query.exec()
  }

  async find(conditions: mongoose.FilterQuery<T>, options?: MongoDBOptions): Promise<T[]> {
    const findOptions = { ...this.defaultOption, ...options }
    const query = this._model
      .find({
        ...conditions,
        is_deleted: { $ne: true }
      })
      .select(this.createSelectFilter(findOptions))
      .sort(findOptions.sort)

    return query.exec()
  }

  async findOneAndUpdate(
    conditions: mongoose.FilterQuery<T>,
    update: Partial<T> | mongoose.UpdateQuery<T>,
    options: mongoose.QueryOptions = { new: true }
  ): Promise<T | null> {
    try {
      return await this._model.findOneAndUpdate(conditions, update, options).exec()
    } catch (error) {
      throw error
    }
  }

  async update(_id: mongoose.Types.ObjectId, item: Partial<T>): Promise<void> {
    try {
      await this._model.updateOne({ _id: _id }, item).exec()
    } catch (error) {
      throw error
    }
  }

  async updateMany(
    filter: mongoose.FilterQuery<T>,
    update: mongoose.UpdateQuery<T>
  ): Promise<mongoose.UpdateWriteOpResult> {
    try {
      return await this._model.updateMany(filter, update).exec()
    } catch (error) {
      throw error
    }
  }

  async delete(_id: string): Promise<void> {
    try {
      await this._model.deleteOne({ _id: this.toObjectId(_id) }).exec()
    } catch (error) {
      throw error
    }
  }

  async deleteMany(filter: mongoose.FilterQuery<T>): Promise<mongoose.mongo.DeleteResult> {
    try {
      const result = await this._model.deleteMany(filter).exec()
      return result
    } catch (error) {
      throw error
    }
  }

  private toObjectId(_id: string): mongoose.Types.ObjectId {
    return new mongoose.Types.ObjectId(_id)
  }
}

export = RepositoryBase
