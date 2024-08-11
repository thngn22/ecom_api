import mongoose = require('mongoose')

interface QueryOptions {
  lean?: boolean
}

interface Read<T> {
  retrieve: (callback: (error: any, result: any) => void) => void
  findById: (id: string, options?: QueryOptions) => Promise<T | null>
  findOne: (conditions: mongoose.FilterQuery<T>, options?: QueryOptions) => Promise<T | null>
  find: (conditions: mongoose.FilterQuery<T>, options?: QueryOptions) => Promise<T[]>
}

export = Read
