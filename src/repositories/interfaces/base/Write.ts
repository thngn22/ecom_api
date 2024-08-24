import mongoose from 'mongoose'
interface Write<T> {
  create: (item: T, callback: (error: any, result: any) => void) => void
  createMany: (item: T[], callback: (error: any, result: any) => void) => void
  update: (_id: mongoose.Types.ObjectId, item: T, callback: (error: any, result: any) => void) => void
  updateMany: (
    filter: mongoose.FilterQuery<T>,
    update: mongoose.UpdateQuery<T>,
  ) => Promise<mongoose.UpdateWriteOpResult>
  findOneAndUpdate: (
    conditions: mongoose.FilterQuery<T>,
    update: Partial<T>,
    options?: mongoose.QueryOptions
  ) => Promise<T | null>
  delete: (_id: string, callback: (error: any, result: any) => void) => void
}

export = Write
