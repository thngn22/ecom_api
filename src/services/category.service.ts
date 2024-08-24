import { v4 } from 'uuid'

import ICategoryModel from '~/models/interfaces/ICategory.interface'
import CategoryRepo from '~/repositories/category.repo'

import ResponseError from '~/core/response.error'
import StatusCodes from '~/utils/statusCodes'
import categoryRepo from '~/repositories/category.repo'

class AccessService {
  static createCate = async ({ name, image, parent_id = null }: ICategoryModel) => {
    let right
    let root_id = v4()
    if (parent_id) {
      const parentCategory = await CategoryRepo.findById(parent_id.toString())
      if (!parentCategory) throw new ResponseError('Parent Category not existed!!!', StatusCodes.BAD_REQUEST)

      await CategoryRepo.updateMany(
        {
          right: { $gte: parentCategory.right }
        },
        {
          $inc: { right: 2 }
        }
      )
      await CategoryRepo.updateMany(
        {
          left: { $gt: parentCategory.right }
        },
        {
          $inc: { left: 2 }
        }
      )

      right = parentCategory.right
      root_id = parentCategory.root_id
    } else {
      const maxRight = await categoryRepo.findOne(
        {},
        {
          select: ['right'],
          sort: '-right'
        }
      )
      console.log('>>maxRight::', maxRight)

      if (maxRight) {
        right = maxRight.right + 1
      } else {
        right = 1
      }
    }

    return await categoryRepo.create({
      name,
      image,
      parent_id,
      left: right,
      right: right + 1,
      root_id
    })
  }
}

export = AccessService