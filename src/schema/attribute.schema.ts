import { z } from 'zod'

// Schema cho mỗi field trong attribute
const attributeFieldSchema = z.object({
  name: z.string(),
  type: z.enum(['string', 'number', 'array', 'object']),
  required: z.boolean().default(false)
})

const create = z.array(attributeFieldSchema).nonempty({
  message: 'Attributes array cannot be empty'
})

const attributeSchema = {
  create
}

export default attributeSchema
