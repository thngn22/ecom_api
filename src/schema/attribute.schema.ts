import { z } from 'zod'

const attributeFieldSchema = z.object({
  name: z.string(),
  type: z.enum(['string', 'number', 'array', 'object']),
  required: z.boolean().default(false)
})

const create = z.object({
  attributes: z.record(attributeFieldSchema).refine((val) => Object.keys(val).length > 0, {
    message: 'Attributes cannot be empty'
  })
})

const attributeSchema = {
  create
}

export default attributeSchema
