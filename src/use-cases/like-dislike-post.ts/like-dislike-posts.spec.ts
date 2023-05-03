import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPostsRepository } from '../../repositories/in-memory/in-memory-posts-repository'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { InMemoryLikeDislikeRepository } from '../../repositories/in-memory/in-memory-like-dislike-repository'
import { LikeDislikePostUseCase } from './like-dislike-post'
import { USER_ROLES } from '../../@types/types'

let likeDislikeRepository: InMemoryLikeDislikeRepository
let postsRepository: InMemoryPostsRepository
let usersRepository: InMemoryUsersRepository
let sut: LikeDislikePostUseCase

describe('Like Dislike Post Use Case', () => {
  beforeEach(() => {
    likeDislikeRepository = new InMemoryLikeDislikeRepository()
    usersRepository = new InMemoryUsersRepository()
    postsRepository = new InMemoryPostsRepository(usersRepository)
    sut = new LikeDislikePostUseCase(
      likeDislikeRepository,
      postsRepository,
      usersRepository,
    )
  })

  it('should be able to like a post that is not already liked or disliked by the user', async () => {
    const userWithPost = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    })

    const user = await usersRepository.create({
      name: 'Natalia Perri',
      email: 'natalia@example.com',
      password_hash: '123456',
    })

    const post = await postsRepository.create({
      content: 'some-content',
      creator_id: userWithPost.id,
    })

    await sut.execute({
      like: true,
      postId: post.id,
      userId: user.id,
    })

    expect(likeDislikeRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          post_id: post.id,
          user_id: user.id,
          like: 1,
        }),
      ]),
    )

    expect(postsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          likes: 1,
          dislikes: undefined,
        }),
      ]),
    )
  })

  it('should be able to dislike a post that is not already disliked or liked by the user', async () => {
    const userWithPost = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    })

    const user = await usersRepository.create({
      name: 'Natalia Perri',
      email: 'natalia@example.com',
      password_hash: '123456',
    })

    const post = await postsRepository.create({
      content: 'some-content',
      creator_id: userWithPost.id,
    })

    await sut.execute({
      like: false,
      postId: post.id,
      userId: user.id,
    })

    expect(likeDislikeRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          post_id: post.id,
          user_id: user.id,
          like: 2,
        }),
      ]),
    )

    expect(postsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          dislikes: 1,
          likes: undefined,
        }),
      ]),
    )
  })

  it('should remove like if user likes a post that is already liked', async () => {
    const userWithPost = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    })

    const user = await usersRepository.create({
      name: 'Natalia Perri',
      email: 'natalia@example.com',
      password_hash: '123456',
    })

    const post = await postsRepository.create({
      content: 'some-content',
      creator_id: userWithPost.id,
    })

    await sut.execute({
      like: true,
      postId: post.id,
      userId: user.id,
    })

    await sut.execute({
      like: true,
      postId: post.id,
      userId: user.id,
    })

    expect(likeDislikeRepository.items).toHaveLength(0)
    expect(postsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          dislikes: undefined,
          likes: undefined,
        }),
      ]),
    )
  })

  it('should remove dislike if user dislikes a post that is already disliked', async () => {
    const userWithPost = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    })

    const user = await usersRepository.create({
      name: 'Natalia Perri',
      email: 'natalia@example.com',
      password_hash: '123456',
    })

    const post = await postsRepository.create({
      content: 'some-content',
      creator_id: userWithPost.id,
    })

    await sut.execute({
      like: false,
      postId: post.id,
      userId: user.id,
    })

    await sut.execute({
      like: false,
      postId: post.id,
      userId: user.id,
    })

    expect(likeDislikeRepository.items).toHaveLength(0)
    expect(postsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          dislikes: undefined,
          likes: undefined,
        }),
      ]),
    )
  })

  it('should be able to user likes a post that is disliked and remove dislike', async () => {
    const userWithPost = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    })

    const user = await usersRepository.create({
      name: 'Natalia Perri',
      email: 'natalia@example.com',
      password_hash: '123456',
    })

    const post = await postsRepository.create({
      content: 'some-content',
      creator_id: userWithPost.id,
    })

    await sut.execute({
      like: false,
      postId: post.id,
      userId: user.id,
    })

    await sut.execute({
      like: true,
      postId: post.id,
      userId: user.id,
    })

    expect(likeDislikeRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          post_id: post.id,
          user_id: user.id,
          like: 1,
        }),
      ]),
    )

    expect(postsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          dislikes: undefined,
          likes: 1,
        }),
      ]),
    )
  })

  it('should be able to user dislikes a post that is liked and remove like', async () => {
    const userWithPost = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    })

    const user = await usersRepository.create({
      name: 'Natalia Perri',
      email: 'natalia@example.com',
      password_hash: '123456',
    })

    const post = await postsRepository.create({
      content: 'some-content',
      creator_id: userWithPost.id,
    })

    await sut.execute({
      like: true,
      postId: post.id,
      userId: user.id,
    })

    await sut.execute({
      like: false,
      postId: post.id,
      userId: user.id,
    })

    expect(likeDislikeRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          post_id: post.id,
          user_id: user.id,
          like: 2,
        }),
      ]),
    )

    expect(postsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          dislikes: 1,
          likes: undefined,
        }),
      ]),
    )
  })
})
