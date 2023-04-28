import { User, UserCreateInput } from '../@types/types'

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>
  create(data: UserCreateInput): Promise<User>
  findById(id: string): Promise<User | undefined>
}
