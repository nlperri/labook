import { KnexPostsRepository } from '../../repositories/knex/posts-knex-repository'
import { UpdatePostUseCase } from '../update-post/update-post'

export function makeUpdatePostUseCase() {
  const postsRepository = new KnexPostsRepository()
  const useCase = new UpdatePostUseCase(postsRepository)

  return useCase
}
