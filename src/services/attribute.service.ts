import IAttributeModel from '~/models/interfaces/IAttribute.inteface'

import attributeRepo from '~/repositories/attribute.repo'
import categoryRepo from '~/repositories/category.repo'

import ResponseError from '~/core/response.error'
import StatusCodes from '~/utils/statusCodes'

class AttributeService {
  /**
   * @desc: this function return all attributes have is_publish: true & is_deleted: false
   *
   * @returns result
   */
  static getAllAttribute = async () => {
    return attributeRepo.find({ is_publish: true, is_deleted: false })
  }

  /**
   * @desc - use for create a new attribute
   * @param {IAttributeModel[]} attribute
   * @returns {IAttributeModel} result after create
   *
   * @example
   * @param
   * [
   *    {
   *        "name": "resolution",
   *        "type": "string",
   *        "require": true
   *    },
   *    {
   *        "name": "screen_size",
   *        "type": "number"
   *    }
   * ]
   *
   */
  static createAttribute = async (attributes: IAttributeModel[]) => {
    if (Array.isArray(attributes)) {
      return await attributeRepo.createMany(attributes)
    }
    return await attributeRepo.create(attributes[0])
  }

  /**
   * @desc: use for update attribute.
   * First, it check existed category.
   * After that, if you want to unpublish this attribute, it allow attribute to unpublish when is_publish in cate is true.
   * @param {IAttributeModel} attribute
   * @returns {IAttributeModel} result model after update
   *
   * @example
   * @param
   * {
   *    "name": "updateName",
   *    "type": "updateType",
   *    "require": true,
   *    "is_publish": fasle | true
   * }
   */
  static updateAttribute = async ({ id, name, type, require = false, is_publish }: IAttributeModel) => {
    const exitedAttribute = await attributeRepo.findById(id, undefined, true)
    if (!exitedAttribute) throw new ResponseError('Attribute not existed!!!', StatusCodes.BAD_REQUEST)

    if (!is_publish) {
      await await Promise.all(
        exitedAttribute.category_orderIds.map(async (item) => {
          const publishCategory = await categoryRepo.findOne({ _id: item, is_publish: true })
          if (publishCategory)
            throw new ResponseError(
              "Can't unpublish this attribute, because its have relevant with one or more category",
              StatusCodes.BAD_REQUEST
            )
        })
      )
    }
    return await attributeRepo.findOneAndUpdate({ _id: id }, { name, type, require, is_publish }, { lean: true })
  }

  /**
   * @desc - use for delete (but update field isDelete: true)
   * First, check existed Attribute
   * Then, if none of category relevant with this attribute have is_deleted: true, allows attribute to deleted
   * @param {string} id
   * @returns {IAttributeModel} result model after update update field is_deleted: true
   */
  static deleteAttribute = async (id: string) => {
    const exitedAttribute = await attributeRepo.findById(id, undefined, true)
    if (!exitedAttribute) throw new ResponseError('Attribute not existed!!!', StatusCodes.BAD_REQUEST)

    const relatedCategories = await categoryRepo.find({
      _id: { $in: exitedAttribute.category_orderIds },
      is_deleted: false
    })

    if (relatedCategories.length > 0) {
      throw new ResponseError(
        "Can't delete this attribute because it's being used by one or more categories that are not deleted",
        StatusCodes.BAD_REQUEST
      )
    }

    return await attributeRepo.findOneAndUpdate({ _id: id }, { is_deleted: true, is_publish: false })
  }
}

export = AttributeService
