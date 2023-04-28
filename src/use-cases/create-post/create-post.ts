import { Post } from '../../@types/types'

import { PostsRepository } from '../../repositories/posts-repository'

interface CreatePostUseCaseRequest {
  content: string
}

interface CreatePostUseCaseResponse {
  post: Post
}

export class CreatePostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({
    content,
  }: CreatePostUseCaseRequest): Promise<CreatePostUseCaseResponse> {
    const post = await this.postsRepository.create({ content })

    return {
      post,
    }
  }
}
