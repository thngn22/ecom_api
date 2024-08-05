import TokenModel = require('~/models/token.model')
import ITokenModel = require('~/models/interfaces/IToken.interface')
import RepositoryBase = require('./base/base.repo')

class TokenRepository extends RepositoryBase<ITokenModel> {
  constructor() {
    super(TokenModel)
  }
}

export = TokenRepository
