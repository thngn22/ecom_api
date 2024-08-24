import { Request, Response, NextFunction } from 'express'

import { ROLES } from '~/utils/constant'
import ResponseError from '~/core/response.error'
import ReasonPhrases from '~/utils/reasonPhrases'
import StatusCodes from '~/utils/statusCodes'
import { isUser } from '~/helper/guards'

const onlyRole = (roles: (keyof typeof ROLES)[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!isUser(req)) {
      throw new ResponseError(ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED)
    }

    const roleKeys = Object.keys(ROLES)
    const rolesValue = roles.map((role) => {
      if (!roleKeys.includes(role)) throw new ResponseError('Invalid roles')
      return ROLES[role]
    })

    if (!rolesValue.includes(req.user.roles[0])) throw new ResponseError(ReasonPhrases.FORBIDDEN)
    next()
  }
}

export default onlyRole
