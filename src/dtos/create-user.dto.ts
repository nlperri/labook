import { randomUUID } from 'crypto'
import { User, UserCreateInput, USER_ROLES } from '../@types/types'

export class CreateUserDTO {
  private user: User
  private constructor(data: UserCreateInput) {
    this.user = {
      ...data,
      id: randomUUID(),
      created_at: new Date().toISOString(),
      password: data.password_hash,
      role: data.role ? data.role : USER_ROLES.NORMAL,
    }
  }

  static build(input: UserCreateInput) {
    const { user } = new CreateUserDTO(input)
    return user
  }
}
