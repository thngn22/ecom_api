import { v4 } from 'uuid'

import ICategoryModel from '~/models/interfaces/ICategory.interface'
import CategoryRepo from '~/repositories/category.repo'

import ResponseError from '~/core/response.error'
import StatusCodes from '~/utils/statusCodes'
import categoryRepo from '~/repositories/category.repo'

class CategoryService {
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

  static getChildCategory = async ({ parent_id = null }: ICategoryModel) => {
    let query
    if (parent_id) {
      const foundParentCate = await categoryRepo.findById(parent_id.toString(), { lean: true })
      if (!foundParentCate) throw new ResponseError('Category not exited!!!', StatusCodes.BAD_REQUEST)
      query = {
        root_id: foundParentCate.root_id,
        left: { $gt: foundParentCate.left },
        right: { $lte: foundParentCate.right }
      }
    } else {
      query = { parent_id: null }
    }

    return await categoryRepo.find(query, {
      unselect: ['left', 'right', 'root_id'],
      sort: 'left'
    })
  }

  static updateCategory = async ({ id, name, image }: ICategoryModel) => {
    const existedCate = await categoryRepo.findById(id)
    if (!existedCate) throw new ResponseError('Category not exited!!!', StatusCodes.BAD_REQUEST)

    return await categoryRepo.findOneAndUpdate({ _id: id }, { name, image })
  }

  static deletaCategory = async (id: string) => {
    const existedCate = await categoryRepo.findById(id)
    if (!existedCate) throw new ResponseError('Category not exited!!!', StatusCodes.BAD_REQUEST)

    const width = existedCate.right - existedCate.left + 1
    await categoryRepo.deleteMany({
      root_id: existedCate.root_id,
      left: { $gte: existedCate.left },
      right: { $lte: existedCate.right }
    })

    await categoryRepo.updateMany(
      {
        right: { $gt: existedCate.right }
      },
      {
        $inc: { right: -width }
      }
    )
    await categoryRepo.updateMany(
      {
        left: { $gt: existedCate.right }
      },
      { $inc: { left: -width } }
    )

    return 'delete successfully!!'
  }
}

export = CategoryService
