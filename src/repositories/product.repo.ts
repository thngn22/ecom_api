import ProductModel from '~/models/product.model'
import IProductModel from '~/models/interfaces/IProduct.interface'
import RepositoryBase from './base/base.repo'

class ProductRepository extends RepositoryBase<IProductModel> {
  constructor() {
    super(ProductModel)
  }
}

export = new ProductRepository()
