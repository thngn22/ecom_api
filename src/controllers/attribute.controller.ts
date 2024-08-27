import { Request, Response } from 'express'

import AttributeService from '~/services/attribute.service'

class AttributeController {
  getAllAttributes = async (req: Request, res: Response) => {
    res.sendData(await AttributeService.getAllAttribute(), 'OK')
  }

  createAttribute = async (req: Request, res: Response) => {
    res.sendData(await AttributeService.createAttribute(req.body), 'Created')
  }

  updateAttribute = async (req: Request, res: Response) => {
    res.sendData(
      await AttributeService.updateAttribute({
        id: req.params.id,
        ...req.body
      }),
      'OK'
    )
  }

  deleteAttribute = async (req: Request, res: Response) => {
    res.sendData(await AttributeService.deleteAttribute(req.params.id), 'OK')
  }
}

export = new AttributeController()
