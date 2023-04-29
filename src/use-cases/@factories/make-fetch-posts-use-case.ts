import { KnexPostsRepository } from '../../repositories/knex/posts-knex-repository'
import { FetchPostsUseCase } from '../fetch-posts/fetch-posts'

export function makeFetchPostsUseCase() {
  const postsRepository = new KnexPostsRepository()
  const useCase = new FetchPostsUseCase(postsRepository)

  return useCase
}
