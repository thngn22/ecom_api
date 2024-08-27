interface MongoDBOptions {
  lean?: boolean
  select?: string[]
  unselect?: string[]
  sort?: string
}

export = MongoDBOptions