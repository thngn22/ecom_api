import { v4 } from 'uuid'

import IAttributeModel from '~/models/interfaces/IAttribute.inteface'

import ResponseError from '~/core/response.error'
import StatusCodes from '~/utils/statusCodes'
import attributeRepo from '~/repositories/attribute.repo'

class AttributeService {
  static createAttribute = async ({ attributes }: IAttributeModel) => {
    return await attributeRepo.create({ attributes })
  }
}

export = AttributeService
