import { z } from 'zod'
import { isValidObjectId, Types } from 'mongoose'

const page = z.number().int().min(1)
const limit = z.number().int().min(5)
const search = z.string().optional()
const sortField = z.string().optional()
const sortType = z.enum(['asc', 'desc'])

const email = z.string().email()
const password = z.string().regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, 'strong password')

const uri = z.string().url()
const id = z
  .string()
  .refine((value: string) => isValidObjectId(value), {
    message: 'Invalid objectId'
  })
  .transform((value) => new Types.ObjectId(value))

const phoneNumber = z.string().regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, 'Invalid phone number')

const positiveInteger = z.number().int().min(1)
const negativeInteger = z.number().int().max(-1)

const positiveNumber = z.number().min(0)
const negativeNumber = z.number().max(0)

const arrayString = z.array(z.string())
const arrayId = z.array(id)
const arrayNumber = z.array(z.number())

export {
  page,
  limit,
  search,
  email,
  uri,
  id,
  phoneNumber,
  password,
  sortField,
  sortType,
  positiveInteger,
  negativeInteger,
  positiveNumber,
  negativeNumber,
  arrayId,
  arrayNumber,
  arrayString
}
