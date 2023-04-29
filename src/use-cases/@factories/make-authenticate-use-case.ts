import { KnexUsersRepository } from '../../repositories/knex/users-knex-repository'
import { AuthenticateUseCase } from '../authenticate/authenticate'

export function makeAuthenticateUseCase() {
  const usersRepository = new KnexUsersRepository()
  const useCase = new AuthenticateUseCase(usersRepository)

  return useCase
}
