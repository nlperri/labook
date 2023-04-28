import { Post } from '../../@types/types'

import { PostsRepository } from '../../repositories/posts-repository'
import { ResourceNotFoundError } from '../@errors/resource-not-found-error'

interface UpdatePostUseCaseRequest {
  id: string
  content: string
}

interface UpdatePostUseCaseResponse {
  post: Post
}

export class UpdatePostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({
    id,
    content,
  }: UpdatePostUseCaseRequest): Promise<UpdatePostUseCaseResponse> {
    const post = await this.postsRepository.update({ content, id })

    if (!post) {
      throw new ResourceNotFoundError('Invalid post id')
    }

    return {
      post,
    }
  }
}
