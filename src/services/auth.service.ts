import AuthRepository = require('~/repositories/auth.repo')

interface SignUpInput {
  name: string
  email: string
  password: string
}

class AuthService {
  private static authRepo = new AuthRepository()

  static signUp = async ({ name, email, password }: SignUpInput) => {
    try {
      // Sử dụng phương thức create từ thể hiện của AuthRepository
      return await this.authRepo.create({ name, email, password })
    } catch (error) {
      const err = error as Error
      return {
        code: 'xxx',
        message: err.message,
        status: 'error'
      }
    }
  }
}

export = AuthService
