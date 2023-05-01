import { Post, TokenPayload, User } from '../../@types/types'

import { PostsRepository } from '../../repositories/posts-repository'
import { ResourceNotFoundError } from '../@errors/resource-not-found-error'
import { UserNotAllowed } from '../@errors/user-not-alowed-error'

interface UpdatePostUseCaseRequest {
  id: string
  content: string
  user: TokenPayload
}

interface UpdatePostUseCaseResponse {
  post: Post
}

export class UpdatePostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({
    id,
    content,
    user,
  }: UpdatePostUseCaseRequest): Promise<UpdatePostUseCaseResponse> {
    const post = await this.postsRepository.update({ content, id })

    if (!post) {
      throw new ResourceNotFoundError('Invalid post id')
    }

    if (post.creator_id !== user.id) {
      throw new UserNotAllowed()
    }

    return {
      post,
    }
  }
}
