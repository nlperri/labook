import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPostsRepository } from '../../repositories/in-memory/in-memory-posts-repository'
import { DeletePostUseCase } from './delete-post'
import { ResourceNotFoundError } from '../@errors/resource-not-found-error'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'

let postsRepository: InMemoryPostsRepository
let usersRepository: InMemoryUsersRepository
let sut: DeletePostUseCase

describe('Create Post Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    postsRepository = new InMemoryPostsRepository(usersRepository)
    sut = new DeletePostUseCase(postsRepository)
  })

  it('should be able to delete a post', async () => {
    const post = await postsRepository.create({
      content: 'some post',
      creator_id: 'user-01',
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
