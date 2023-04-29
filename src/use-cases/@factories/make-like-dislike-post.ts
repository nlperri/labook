import { KnexLikeDislikeRepository } from '../../repositories/knex/like-dislike-knex-repository'
import { KnexPostsRepository } from '../../repositories/knex/posts-knex-repository'
import { KnexUsersRepository } from '../../repositories/knex/users-knex-repository'
import { LikeDislikePostUseCase } from '../like-dislike-post.ts/like-dislike-post'

export function makeLikeDislikeUseCase() {
  const likeDislikeRepository = new KnexLikeDislikeRepository()
  const postsRepository = new KnexPostsRepository()
  const usersRepository = new KnexUsersRepository()
  const useCase = new LikeDislikePostUseCase(
    likeDislikeRepository,
    postsRepository,
    usersRepository,
  )

  return useCase
}
