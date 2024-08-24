import mongoose = require('mongoose')
import MongoDBOptions from '../types/MongoDBOptions'

interface Read<T> {
  retrieve: (callback: (error: any, result: any) => void) => void
  findById: (_id: string | null, options?: MongoDBOptions) => Promise<T | null>
  findOne: (conditions: mongoose.FilterQuery<T>, options?: MongoDBOptions) => Promise<T | null>
  find: (conditions: mongoose.FilterQuery<T>, options?: MongoDBOptions) => Promise<T[]>
}

export = Read
