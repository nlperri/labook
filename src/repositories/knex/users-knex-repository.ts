import { randomUUID } from 'node:crypto'
import { USER_ROLES, UserCreateInput } from '../../@types/types'
import { Db } from '../../database/BaseDataBase'
import { UsersRepository } from '../users-repository'

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

    const newUser = {
      id: randomUUID(),
      name,
      email,
      password: password_hash,
      created_at: new Date().toISOString(),
      role,
    }

    await Db.connection('users').insert(newUser)

    return newUser
  }

  async findById(id: string) {
    const [result] = await Db.connection('users').where({ id })

    return result
  }
}
