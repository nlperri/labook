import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPostsRepository } from '../../repositories/in-memory/in-memory-posts-repository'
import { FetchPostsUseCase } from './fetch-posts'

let postsRepository: InMemoryPostsRepository
let sut: FetchPostsUseCase

describe('Create Post Use Case', () => {
  beforeEach(() => {
    postsRepository = new InMemoryPostsRepository()
    sut = new FetchPostsUseCase(postsRepository)
  })

  it('should be able to fetch posts', async () => {
    await postsRepository.create({
      content: 'some-content',
    })

    await postsRepository.create({
      content: 'another-content',
    })

    const { posts } = await sut.execute()

    expect(posts).toHaveLength(2)
    expect(posts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          content: expect.any(String),
          likes: expect.any(Number),
          dislikes: expect.any(Number),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          creator: {
            id: expect.any(String),
            name: expect.any(String),
          },
        }),
      ]),
    )
  })
})
