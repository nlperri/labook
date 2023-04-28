import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPostsRepository } from '../../repositories/in-memory/in-memory-posts-repository'
import { CreatePostUseCase } from './create-post'

let postsRepository: InMemoryPostsRepository
let sut: CreatePostUseCase

describe('Create Post Use Case', () => {
  beforeEach(() => {
    postsRepository = new InMemoryPostsRepository()
    sut = new CreatePostUseCase(postsRepository)
  })

  it('should be able to create a post', async () => {
    const { post } = await sut.execute({
      content: 'some post',
    })

    expect(post.id).toEqual(expect.any(String))
  })
})
