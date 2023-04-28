import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPostsRepository } from '../../repositories/in-memory/in-memory-posts-repository'
import { DeletePostUseCase } from './delete-post'
import { ResourceNotFoundError } from '../@errors/resource-not-found-error'

let postsRepository: InMemoryPostsRepository
let sut: DeletePostUseCase

describe('Create Post Use Case', () => {
  beforeEach(() => {
    postsRepository = new InMemoryPostsRepository()
    sut = new DeletePostUseCase(postsRepository)
  })

  it('should be able to delete a post', async () => {
    const post = await postsRepository.create({
      content: 'some post',
    })

    await sut.execute({ id: post.id })

    const posts = await postsRepository.fetch()

    expect(posts).toHaveLength(0)
  })

  it('should throw ResourceNotFoundError when receive an inexistent id', async () => {
    await expect(() =>
      sut.execute({ id: 'inexistent-id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
