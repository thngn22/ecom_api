import { z } from 'zod'

const create = z.object({
  name: z.string().nonempty('Name is required'),
  image: z.string().optional(),
  parent_id: z.union([z.string(), z.null()]).optional()
})

const categorySchema = {
  create
}

export default categorySchema
