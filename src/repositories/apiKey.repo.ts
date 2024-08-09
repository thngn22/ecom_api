import ApiKeyModel = require('~/models/apiKey.model')
import IApiKeyModel = require('~/models/interfaces/IApiKey.interface')
import RepositoryBase = require('./base/base.repo')

class ApiKeyRepository extends RepositoryBase<IApiKeyModel> {
  constructor() {
    super(ApiKeyModel)
  }
}

export = ApiKeyRepository
