import { Post } from '../../@types/types'

import { PostsRepository } from '../../repositories/posts-repository'
import { UsersRepository } from '../../repositories/users-repository'
import { ResourceNotFoundError } from '../@errors/resource-not-found-error'

interface CreatePostUseCaseRequest {
  content: string
  userId: string
}

interface CreatePostUseCaseResponse {
  post: Post
}

export class CreatePostUseCase {
  constructor(
    private postsRepository: PostsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    content,
    userId,
  }: CreatePostUseCaseRequest): Promise<CreatePostUseCaseResponse> {
    const userIdExists = await this.usersRepository.findById(userId)

    if (!userIdExists) {
      throw new ResourceNotFoundError('Invalid user Id')
    }

    const post = await this.postsRepository.create({
      content,
      creator_id: userId,
    })

    return {
      post,
    }
  }
}
