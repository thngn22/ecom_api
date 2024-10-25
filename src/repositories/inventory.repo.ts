import InventoryModel from '~/models/inventory.model'
import { IInventoryModel } from '~/models/interfaces/IInventory.interface'
import RepositoryBase from './base/base.repo'

class InventoryRepository extends RepositoryBase<IInventoryModel> {
  constructor() {
    super(InventoryModel)
  }
}

export = new InventoryRepository()
