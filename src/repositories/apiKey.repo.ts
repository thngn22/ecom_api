import ApiKeyModel = require('~/models/apiKey.model')
import IApiKeyModel = require('~/models/interfaces/IApiKey.interface')
import RepositoryBase = require('./base/base.repo')
import { FilterQuery } from 'mongoose'
import MongoDBOptions from './interfaces/types/MongoDBOptions'

class ApiKeyRepository extends RepositoryBase<IApiKeyModel> {
  constructor() {
    super(ApiKeyModel)
  }

  findOne(conditions: FilterQuery<IApiKeyModel>, options?: MongoDBOptions): Promise<IApiKeyModel | null> {
    console.log('repo apikey')

    return super.findOne(conditions, options)
  }
}

export = new ApiKeyRepository()
