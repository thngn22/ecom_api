import mongoose = require('mongoose')

interface QueryOptions {
  lean?: boolean
}

interface Read<T> {
  retrieve: (callback: (error: any, result: any) => void) => void
  findById(id: string, callback: (error: any, result: T | null) => void): void
  findOne: (conditions: mongoose.FilterQuery<T>, options?: QueryOptions) => Promise<T | null>
  find: (conditions: mongoose.FilterQuery<T>, options?: QueryOptions) => Promise<T[]>
}

export = Read
