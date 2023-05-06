import { compare } from 'bcryptjs'
import { User } from '../../@types/types'
import { UsersRepository } from '../../repositories/users-repository'
import { UserNotAllowed } from '../@errors/user-not-alowed-error'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new UserNotAllowed()
    }

    const doesPasswordMatches = await compare(password, user.password)

    if (!doesPasswordMatches) {
      throw new UserNotAllowed()
    }

    return {
      user,
    }
  }
}
