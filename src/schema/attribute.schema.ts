import { z } from 'zod'
import { id } from './common.schema'

const attributeFieldSchema = z.object({
  name: z.string(),
  type: z.enum(['string', 'number', 'array', 'object']),
  require: z.boolean().default(false)
})

const create = z.array(attributeFieldSchema).nonempty({
  message: 'Attributes array cannot be empty'
})

const attributeId = z.object({
  id
})

const update = z.object({
  name: z.string(),
  type: z.enum(['string', 'number', 'array', 'object']),
  require: z.boolean(),
  is_publish: z.boolean()
})

const attributeSchema = {
  create,
  attributeId,
  update
}

export default attributeSchema
