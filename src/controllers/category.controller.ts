import { Request, Response, NextFunction } from 'express'

import CategoryService from '~/services/category.service'

class CategoryController {
  createCate = async (req: Request, res: Response, next: NextFunction) => {
    res.sendData(await CategoryService.createCate(req.body), 'Created')
  }
}

export = new CategoryController()
