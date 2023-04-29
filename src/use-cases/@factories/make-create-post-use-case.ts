import { KnexPostsRepository } from '../../repositories/knex/posts-knex-repository'
import { KnexUsersRepository } from '../../repositories/knex/users-knex-repository'
import { CreatePostUseCase } from '../create-post/create-post'

export function makeCreatePostUseCase() {
  const postsRepository = new KnexPostsRepository()
  const usersRepository = new KnexUsersRepository()
  const useCase = new CreatePostUseCase(postsRepository, usersRepository)

  return useCase
}
