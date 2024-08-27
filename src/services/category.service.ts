import { v4 } from 'uuid'

import ICategoryModel from '~/models/interfaces/ICategory.interface'
import categoryRepo from '~/repositories/category.repo'
import attributeRepo from '~/repositories/attribute.repo'

import ResponseError from '~/core/response.error'
import StatusCodes from '~/utils/statusCodes'
import ReasonPhrases from '~/utils/reasonPhrases'

class CategoryService {
  /**
   * @desc: this function check parent_id. If it null, cate is root.
   * After that, update left and right follow Nested model(tree).
   * Finally, add _id into category_orderIds in category document
   *
   * @param {string} name
   * @param {string} image
   * @param {string | null} parent_id - null if you want to create root Category
   * @param {array} attributes
   * @returns result
   *
   * @example
   * {
   *    "name": "nameOfCategory",
   *    "image": "urlImage",
   *    "attributes": ["66cb521fea2f0154d2246212", "66cb521fea2f0154d2246213"]
   * }
   */
  static createCate = async ({ name, image, parent_id = null, attributes }: ICategoryModel) => {
    let right
    let root_id = v4()
    if (parent_id) {
      const parentCategory = await categoryRepo.findById(parent_id.toString(), undefined, true)
      if (!parentCategory) throw new ResponseError('Parent Category not existed!!!', StatusCodes.BAD_REQUEST)

      await categoryRepo.updateMany(
        {
          right: { $gte: parentCategory.right }
        },
        {
          $inc: { right: 2 }
        }
      )
      await categoryRepo.updateMany(
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

      if (maxRight) {
        right = maxRight.right + 1
      } else {
        right = 1
      }
    }

    if (attributes.length > 0) {
      await Promise.all(
        attributes.map(async (item) => {
          const existedAttribute = await attributeRepo.findById(item.toString(), undefined, true)
          if (!existedAttribute) throw new ResponseError('Attribute not existed', StatusCodes.BAD_REQUEST)
        })
      )

      const result = await categoryRepo.create({
        name,
        image,
        parent_id,
        attributes,
        left: right,
        right: right + 1,
        root_id
      })

      if (!result) throw new ResponseError(ReasonPhrases.INTERNAL_SERVER_ERROR)

      await Promise.all(
        attributes.map(async (item) => {
          await attributeRepo.findOneAndUpdate({ _id: item }, { $push: { category_orderIds: result._id } })
        })
      )

      return result
    }
    throw new ResponseError('attributes field must have at least 1 element', StatusCodes.BAD_REQUEST)
  }

  /**
   * @desc: this function get child category
   *
   * @param {string | null} parent_id - null if you want to get all of category root
   * @returns result
   */
  static getChildCategory = async ({ parent_id = null }: ICategoryModel) => {
    let query
    if (parent_id) {
      const foundParentCate = await categoryRepo.findById(parent_id.toString(), { lean: true }, true)
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

  /**
   * @desc: this function update category
   *
   * @param {string} id
   * @param {string} name
   * @param {string} image
   * @param {array[string]} attributes
   * @returns result
   *
   * @example
   * {
   *    "name": "nameOfCategory",
   *    "image": "urlImage",
   *    "attributes": ["66cb521fea2f0154d2246212", "66cb521fea2f0154d2246213"]
   * }
   */
  static updateCategory = async ({ id, name, image, attributes }: ICategoryModel) => {
    const existedCate = await categoryRepo.findById(id, undefined, true)
    if (!existedCate) throw new ResponseError('Category not exited!!!', StatusCodes.BAD_REQUEST)

    return await categoryRepo.findOneAndUpdate({ _id: id }, { name, image, attributes })
  }

  /**
   * @desc: this function handle publish or unpublish category
   * First it check id and find this cate and cate's child.
   * Then, update is_publish follow Nested model(tree).
   *
   * @param {string} id
   * @returns result
   */
  static handlePublishCategory = async (id: string) => {
    const existedCate = await categoryRepo.findById(id, undefined, true)
    if (!existedCate) throw new ResponseError('Category not exited!!!', StatusCodes.BAD_REQUEST)

    await categoryRepo.updateMany(
      {
        root_id: existedCate.root_id,
        left: { $gte: existedCate.left },
        right: { $lte: existedCate.right }
      },
      {
        $set: {
          is_publish: !existedCate.is_publish
        }
      }
    )

    return 'Successfully!!'
  }

  /**
   * @desc: this function deleted category
   * First it check id.
   * After that, update left and right others follow Nested model(tree). Algo is, find cate which left >= left+width, update left-width and right is same.
   * Finally, update left and right of cate and childCate to 0.
   *
   * @param {string} id
   * @returns result
   */
  static deletaCategory = async (id: string) => {
    const existedCate = await categoryRepo.findById(id, undefined, true)
    if (!existedCate) throw new ResponseError('Category not exited!!!', StatusCodes.BAD_REQUEST)

    const categoryIds = await categoryRepo.find(
      {
        root_id: existedCate.root_id,
        left: { $gte: existedCate.left },
        right: { $lte: existedCate.right }
      },
      { select: ['_id'] }
    )
    await attributeRepo.updateMany(
      {
        category_orderIds: { $in: categoryIds }
      },
      { $pull: { category_orderIds: { $in: categoryIds } } }
    )
    await categoryRepo.updateMany(
      {
        root_id: existedCate.root_id,
        left: { $gte: existedCate.left },
        right: { $lte: existedCate.right }
      },
      {
        $set: {
          root_id: null,
          parent_id: null,
          left: 0,
          right: 0,
          is_deleted: true,
          is_publish: false
        }
      }
    )

    const width = existedCate.right - existedCate.left + 1
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
