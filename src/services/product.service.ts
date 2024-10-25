import IProductModel from '~/models/interfaces/IProduct.interface'
import productRepo from '~/repositories/product.repo'

import ResponseError from '~/core/response.error'
import StatusCodes from '~/utils/statusCodes'
import ReasonPhrases from '~/utils/reasonPhrases'

class ProductService {
  /**
   * @desc: Create a new product
   * @param {IProductModel} data - The data for the new product
   * @returns {Promise<IProductModel>} The created product
   */
  static createProduct = async (data: IProductModel) => {
    return 'ok'
  }
}

export = ProductService
