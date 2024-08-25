import IAttributeModel from '~/models/interfaces/IAttribute.inteface'

import ResponseError from '~/core/response.error'
import StatusCodes from '~/utils/statusCodes'
import attributeRepo from '~/repositories/attribute.repo'

class AttributeService {
  /**
   *
   * @param {IAttributeModel} attribute
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
}

export = AttributeService
