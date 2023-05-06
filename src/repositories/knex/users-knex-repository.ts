import { USER_ROLES, UserCreateInput } from '../../@types/types'
import { Db } from '../../database/base-database'
import { UsersRepository } from '../users-repository'
import { CreateUserDTO } from '../../dtos/create-user.dto'

export class KnexUsersRepository extends Db implements UsersRepository {
  async findByEmail(email: string) {
    const [result] = await Db.connection('users').where({
      email,
    })

    if (!result) {
      return null
    }

    return result
  }

  async create(data: UserCreateInput) {
    const { name, email, password_hash } = data
    const role = USER_ROLES.ADMIN

    const user = CreateUserDTO.build({ name, email, password_hash, role })

    await Db.connection('users').insert(user)

    return user
  }

  async findById(id: string) {
    const result = await Db.connection('users').where({ id }).first()

    return result
  }
}
