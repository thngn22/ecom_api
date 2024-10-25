import { Request, Response, NextFunction } from 'express'

import ProductService from '~/services/product.service'

class ProductController {
//   getAllProducts = async (req: Request, res: Response) => {
//     res.sendData(await ProductService.getAllProducts(), 'OK')
//   }

  createProduct = async (req: Request, res: Response) => {
    res.sendData(await ProductService.createProduct(req.body), 'Created')
  }

//   updateProduct = async (req: Request, res: Response) => {
//     res.sendData(
//       await ProductService.updateProduct({
//         id: req.params.id,
//         ...req.body
//       }),
//       'OK'
//     )
//   }

//   deleteProduct = async (req: Request, res: Response) => {
//     res.sendData(await ProductService.deleteProduct(req.params.id), 'OK')
//   }
}

export = new ProductController()
