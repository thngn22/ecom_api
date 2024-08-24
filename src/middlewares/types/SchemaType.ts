import { ZodSchema } from 'zod'

type SchemaType = {
  body?: ZodSchema<any>
  query?: ZodSchema<any>
  params?: ZodSchema<any>
}

export default SchemaType
