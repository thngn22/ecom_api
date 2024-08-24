import CategoryModel = require('~/models/category.model')
import ICategoryModel = require('~/models/interfaces/ICategory.interface')
import RepositoryBase = require('./base/base.repo')
import { FilterQuery, QueryOptions } from 'mongoose'
import MongoDBOptions from './interfaces/types/MongoDBOptions'

class CategoryRepository extends RepositoryBase<ICategoryModel> {
  constructor() {
    super(CategoryModel)
  }
  findOne(conditions: FilterQuery<ICategoryModel>, options?: MongoDBOptions): Promise<ICategoryModel | null> {
    return super.findOne(conditions, options)
  }

  findOneAndUpdate(
    conditions: FilterQuery<ICategoryModel>,
    update: Partial<ICategoryModel>,
    options?: QueryOptions
  ): Promise<ICategoryModel | null> {
    return super.findOneAndUpdate(conditions, update, options)
  }
}

export = new CategoryRepository()
