import { PostsRepository } from '../../repositories/posts-repository'
import { ResourceNotFoundError } from '../@errors/resource-not-found-error'

interface DeletePostUseCaseRequest {
  id: string
}

export class DeletePostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({ id }: DeletePostUseCaseRequest): Promise<void> {
    const post = await this.postsRepository.findById(id)

    if (!post) {
      throw new ResourceNotFoundError('Invalid post id')
    }

    await this.postsRepository.delete(id)
  }
}
