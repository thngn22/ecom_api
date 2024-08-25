import { Request, Response } from 'express'

import AttributeService from '~/services/attribute.service'

class AttributeController {
  createAttribute = async (req: Request, res: Response) => {
    res.sendData(await AttributeService.createAttribute(req.body), 'Created')
  }
}

export = new AttributeController()
