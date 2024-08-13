import ApiKeyRepository from '~/repositories/apiKey.repo'
import crypto = require('node:crypto')
import ResponseError from '~/core/response.error'
import statusCodes from '~/utils/statusCodes'
import reasonPhrases from '~/utils/reasonPhrases'

interface FindOneInput {
  key: string
  status: boolean
}

class ApiKeyService {
  static findOne = async ({ key, status = true }: FindOneInput) => {

    // await this.apiKeyRepo.create({ key: crypto.randomBytes(64).toString('hex'), permission: ['0000'] })
    const result = await ApiKeyRepository.findOne({ key, status }, { lean: true })
    if (!result) throw new ResponseError(statusCodes.CONFLICT, reasonPhrases.CONFLICT)
    return result
  }
}

export = ApiKeyService
