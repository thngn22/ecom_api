import AuthModel = require('~/models/auth.model')
import IAuthModel = require('~/models/interfaces/IAuth.interface')
import RepositoryBase = require('./base/base.repo')

class AuthRepository extends RepositoryBase<IAuthModel> {
  constructor() {
    super(AuthModel)
  }
}

export = AuthRepository
