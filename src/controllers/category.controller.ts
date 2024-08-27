import { Request, Response, NextFunction } from 'express'

import CategoryService from '~/services/category.service'

class CategoryController {
  getChildCategory = async (req: Request, res: Response) => {
    res.sendData(await CategoryService.getChildCategory(req.body), 'OK')
  }

  createCate = async (req: Request, res: Response) => {
    res.sendData(await CategoryService.createCate(req.body), 'Created')
  }

  updateCate = async (req: Request, res: Response) => {
    res.sendData(
      await CategoryService.updateCategory({
        id: req.params.id,
        ...req.body
      }),
      'OK'
    )
  }

  handlePublishCate = async (req: Request, res: Response) => {
    res.sendData(await CategoryService.handlePublishCategory(req.params.id), 'OK')
  }

  deleteCate = async (req: Request, res: Response) => {
    res.sendData(await CategoryService.deletaCategory(req.params.id), 'OK')
  }
}

export = new CategoryController()
