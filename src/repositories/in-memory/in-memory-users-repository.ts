import { randomUUID } from 'crypto'
import { USER_ROLES, User, UserCreateInput } from '../../@types/types'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)
    if (!user) {
      return null
    }
    return user
  }

  async create(data: UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password_hash,
      created_at: new Date(),
      role: USER_ROLES.ADMIN,
    }
    this.items.push(user)

    return user
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    return user
  }
}
