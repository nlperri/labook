import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPostsRepository } from '../../repositories/in-memory/in-memory-posts-repository'
import { UpdatePostUseCase } from './update-post'
import { ResourceNotFoundError } from '../@errors/resource-not-found-error'

let postsRepository: InMemoryPostsRepository
let sut: UpdatePostUseCase

describe('Create Post Use Case', () => {
  beforeEach(() => {
    postsRepository = new InMemoryPostsRepository()
    sut = new UpdatePostUseCase(postsRepository)
  })

  it('should be able to update a post', async () => {
    const postToUpdate = await postsRepository.create({
      content: 'some post',
    })

    const { post } = await sut.execute({
      id: postToUpdate.id,
      content: 'edited post',
    })

    expect(post).toEqual(
      expect.objectContaining({
        content: 'edited post',
      }),
    )
  })

  it('should throw ResourceNotFoundError when receive an inexistent id', async () => {
    await expect(() =>
      sut.execute({
        id: 'inexistent-id',
        content: 'some content',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
9
