import { z } from 'zod'
import { id } from './common.schema'

const getChildCategory = z.object({
  parent_id: id
})

const create = z.object({
  name: z.string().nonempty('Name is required'),
  image: z.string().nonempty('Name is required').optional(),
  parent_id: z.union([z.string(), z.null()]).optional(),
  attributes: z.array(id).nonempty({
    message: 'Attributes array cannot be empty'
  })
})

const categoryId = z.object({
  id
})

const update = z.object({
  name: z.string(),
  image: z.string().optional(),
  attributes: z.array(id)
})

const categorySchema = {
  getChildCategory,
  create,
  categoryId,
  update
}

export default categorySchema
