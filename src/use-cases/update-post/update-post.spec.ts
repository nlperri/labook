import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPostsRepository } from '../../repositories/in-memory/in-memory-posts-repository'
import { UpdatePostUseCase } from './update-post'
import { ResourceNotFoundError } from '../@errors/resource-not-found-error'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'

let postsRepository: InMemoryPostsRepository
let usersRepository: InMemoryUsersRepository
let sut: UpdatePostUseCase

describe('Update Post Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    postsRepository = new InMemoryPostsRepository(usersRepository)
    sut = new UpdatePostUseCase(postsRepository)
  })

  it('should be able to update a post', async () => {
    const postToUpdate = await postsRepository.create({
      content: 'some post',
      creator_id: 'user-01',
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
