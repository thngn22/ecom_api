import IRead = require('../interfaces/base/Read')
import IWrite = require('../interfaces/base/Write')
import mongoose = require('mongoose')

class RepositoryBase<T extends mongoose.Document> implements IRead<T>, IWrite<T> {
  private _model: mongoose.Model<T>

  constructor(schemaModel: mongoose.Model<T>) {
    this._model = schemaModel
  }

  async create(item: Partial<T> | Partial<T>[]): Promise<T[]> {
    try {
      // Nếu item là một mảng, phương thức create của Mongoose sẽ xử lý trực tiếp
      // Nếu không, nó sẽ bao bọc item trong một mảng
      if (Array.isArray(item)) {
        return await this._model.create(item)
      } else {
        return await this._model.create([item])
      }
    } catch (error) {
      throw error
    }
  }

  retrieve(callback: (error: any, result: T[]) => void) {
    this._model.find({}, callback)
  }

  update(_id: mongoose.Types.ObjectId, item: Partial<T>, callback: (error: any, result: any) => void) {
    this._model.updateOne({ _id: _id }, item, callback)
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._model.deleteOne({ _id: this.toObjectId(_id) }, (err: any) => callback(err, null))
  }

  findById(_id: string, callback: (error: any, result: T | null) => void) {
    this._model.findById(_id, callback)
  }

  private toObjectId(_id: string): mongoose.Types.ObjectId {
    return new mongoose.Types.ObjectId(_id)
  }
}

export = RepositoryBase
