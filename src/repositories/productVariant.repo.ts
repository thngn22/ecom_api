import ProductVariantModel from '~/models/productVariant.model'
import { IProductVariantModel } from '~/models/interfaces/IProductVariant.interface'
import RepositoryBase from './base/base.repo'

class ProductVariantRepository extends RepositoryBase<IProductVariantModel> {
  constructor() {
    super(ProductVariantModel)
  }
}

export = new ProductVariantRepository()
