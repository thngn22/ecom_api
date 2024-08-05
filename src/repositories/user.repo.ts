import UserModel = require('~/models/user.model')
import IUserModel = require('~/models/interfaces/IUser.interface')
import RepositoryBase = require('./base/base.repo')

class UserRepository extends RepositoryBase<IUserModel> {
  constructor() {
    super(UserModel)
  }
}

export = UserRepository
