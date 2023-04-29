import { KnexUsersRepository } from '../../repositories/knex/users-knex-repository'
import { RegisterUseCase } from '../register/register'

export function makeRegisterUseCase() {
  const usersRepository = new KnexUsersRepository()
  const useCase = new RegisterUseCase(usersRepository)

  return useCase
}
