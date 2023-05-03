import { TokenPayload, USER_ROLES } from '../../@types/types'
import { likeDislikeRepository } from '../../repositories/like-dislike-repository'
import { PostsRepository } from '../../repositories/posts-repository'
import { ResourceNotFoundError } from '../@errors/resource-not-found-error'
import { UserNotAllowed } from '../@errors/user-not-alowed-error'

interface DeletePostUseCaseRequest {
  id: string
  user: TokenPayload
}

export class DeletePostUseCase {
  constructor(
    private postsRepository: PostsRepository,
    private likeDislikeRepository: likeDislikeRepository,
  ) {}

  async execute({ id, user }: DeletePostUseCaseRequest): Promise<void> {
    const post = await this.postsRepository.findById(id)

    if (!post) {
      throw new ResourceNotFoundError('Invalid post id')
    }
    const isUserAdmin = user.role === USER_ROLES.ADMIN
    const isUserTheCreator = user.id === post.creator_id

    const isPostsLiked = await this.likeDislikeRepository.findByIds(id, user.id)

    if (isPostsLiked) {
      await this.likeDislikeRepository.delete(id, user.id)
    }

    if (isUserAdmin || isUserTheCreator) {
      await this.postsRepository.delete(id)
      return
    }

    throw new UserNotAllowed()
  }
}
