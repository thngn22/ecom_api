import MongoDBOptions from './MongoDBOptions'

interface PaginateOptions extends MongoDBOptions {
  page?: number
  limit?: number
}

export = PageTransitionEvent
