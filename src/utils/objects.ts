import _ = require('lodash')

interface GetIntoDataParams<T> {
  fields: (keyof T)[]
  object: Partial<T>
}

const getIntoData = <T>({ fields, object }: GetIntoDataParams<T>): Partial<T> => {
  return _.pick(object, fields)
}

export { getIntoData }
