import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPostsRepository } from '../../repositories/in-memory/in-memory-posts-repository'
import { DeletePostUseCase } from './delete-post'
import { ResourceNotFoundError } from '../@errors/resource-not-found-error'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { UserNotAllowed } from '../@errors/user-not-alowed-error'
import { USER_ROLES } from '../../@types/types'

let postsRepository: InMemoryPostsRepository
let usersRepository: InMemoryUsersRepository
let sut: DeletePostUseCase

describe('Delete Post Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    postsRepository = new InMemoryPostsRepository(usersRepository)
    sut = new DeletePostUseCase(postsRepository)
  })

  it('should be able to delete a post', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      role: USER_ROLES.NORMAL,
    })

    const post = await postsRepository.create({
      content: 'some post',
      creator_id: user.id,
    })

    await sut.execute({ id: post.id, user })

    const posts = postsRepository.items

    expect(posts).toHaveLength(0)
  })

  it('should throw ResourceNotFoundError when receive an inexistent post id', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({ id: 'inexistent-id', user: user }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should be able to delete a post if user role is ADMIN', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      role: USER_ROLES.ADMIN,
    })

    const post = await postsRepository.create({
      content: 'some post',
      creator_id: 'some-user',
    })

    await sut.execute({ id: post.id, user })

    const posts = postsRepository.items

    expect(posts).toHaveLength(0)
  })

  it('should not be able to delete a post if post is not from user or user is not admin', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      role: USER_ROLES.NORMAL,
    })

    const post = await postsRepository.create({
      content: 'some post',
      creator_id: 'some-user',
    })

    await expect(() =>
      sut.execute({ id: post.id, user }),
    ).rejects.toBeInstanceOf(UserNotAllowed)
  })
})
