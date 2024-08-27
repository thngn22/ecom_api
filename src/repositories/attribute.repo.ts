import AttributeModel = require('~/models/attribute.model')
import IAttributeModel = require('~/models/interfaces/IAttribute.inteface')
import RepositoryBase = require('./base/base.repo')
import { FilterQuery, QueryOptions } from 'mongoose'
import MongoDBOptions from './interfaces/types/MongoDBOptions'

class AttributeRepository extends RepositoryBase<IAttributeModel> {
  constructor() {
    super(AttributeModel)
  }
}

export = new AttributeRepository()
