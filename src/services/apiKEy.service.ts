import ApiKeyRepository = require('~/repositories/apiKey.repo')
import crypto = require('node:crypto')

interface FindOneInput {
  key: string
  status: boolean
}

class ApiKeyService {
  private static apiKeyRepo = new ApiKeyRepository()

  static findOne = async ({ key, status = true }: FindOneInput) => {
    // await this.apiKeyRepo.create({ key: crypto.randomBytes(64).toString('hex'), permission: ['0000'] })
    const result = await this.apiKeyRepo.findOne({ key, status }, { lean: true })
    return result
  }
}

export = ApiKeyService
