import IRead = require('../interfaces/base/Read')
import IWrite = require('../interfaces/base/Write')
import mongoose = require('mongoose')

interface QueryOptions {
  lean?: boolean
}

class RepositoryBase<T extends mongoose.Document> implements IRead<T>, IWrite<T> {
  private _model: mongoose.Model<T>

  constructor(schemaModel: mongoose.Model<T>) {
    this._model = schemaModel
  }

  async create(item: Partial<T>): Promise<T> {
    try {
      const data = await this._model.create([item])
      return data[0]
    } catch (error) {
      throw error
    }
  }

  async createMany(item: Partial<T>[]): Promise<T[]> {
    try {
      return await this._model.create(item)
    } catch (error) {
      throw error
    }
  }

  retrieve(callback: (error: any, result: T[]) => void) {
    this._model.find({}, callback)
  }

  findById(_id: string, callback: (error: any, result: T | null) => void) {
    this._model.findById(_id, callback)
  }

  async findOne(conditions: mongoose.FilterQuery<T>, options?: QueryOptions): Promise<T | null> {
    let query = this._model.findOne(conditions)
    if (options?.lean) {
      query = query.lean()
    }
    return query.exec()
  }

  async find(conditions: mongoose.FilterQuery<T>, options?: QueryOptions): Promise<T[]> {
    let query = this._model.find(conditions)
    if (options?.lean) {
      query = query.lean()
    }
    return query.exec()
  }

  update(_id: mongoose.Types.ObjectId, item: Partial<T>, callback: (error: any, result: any) => void) {
    this._model.updateOne({ _id: _id }, item, callback)
  }

  async findOneAndUpdate(
    conditions: mongoose.FilterQuery<T>,
    update: Partial<T>,
    options: mongoose.QueryOptions = { new: true }
  ): Promise<T | null> {
    try {
      return await this._model.findOneAndUpdate(conditions, update, options).exec()
    } catch (error) {
      throw error
    }
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._model.deleteOne({ _id: this.toObjectId(_id) }, (err: any) => callback(err, null))
  }

  private toObjectId(_id: string): mongoose.Types.ObjectId {
    return new mongoose.Types.ObjectId(_id)
  }
}

export = RepositoryBase
