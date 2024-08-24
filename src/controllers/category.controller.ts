import { Request, Response, NextFunction } from 'express'

import CategoryService from '~/services/category.service'

class CategoryController {
  getChildCategory = async (req: Request, res: Response) => {
    res.sendData(await CategoryService.getChildCategory(req.body), 'OK')
  }

  createCate = async (req: Request, res: Response) => {
    res.sendData(await CategoryService.createCate(req.body), 'Created')
  }
}

export = new CategoryController()
