import AuthModel = require('~/models/auth.model')
import IAuthModel = require('~/models/interfaces/IAuth.interface')
import RepositoryBase = require('./base/base.repo')
import { FilterQuery, QueryOptions } from 'mongoose'
import MongoDBOptions from './interfaces/types/MongoDBOptions'

class AuthRepository extends RepositoryBase<IAuthModel> {
  constructor() {
    super(AuthModel)
  }

  create(item: Partial<IAuthModel>): Promise<IAuthModel> {
    return super.create(item)
  }

  findOne(conditions: FilterQuery<IAuthModel>, options?: MongoDBOptions): Promise<IAuthModel | null> {
    return super.findOne(conditions, options)
  }

  findOneAndUpdate(
    conditions: FilterQuery<IAuthModel>,
    update: Partial<IAuthModel>,
    options?: QueryOptions
  ): Promise<IAuthModel | null> {
    return super.findOneAndUpdate(conditions, update, options)
  }

  /**
   * conditions: email
   * update: refreshToken = null
   * options: (default: new = true)
   */
  deleteRefreshToken(
    conditions: FilterQuery<IAuthModel>,
    update: Partial<IAuthModel>,
    options?: QueryOptions
  ): Promise<IAuthModel | null> {
    return super.findOneAndUpdate(conditions, update, options)
  }
}

export = new AuthRepository()
