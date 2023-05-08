import supertest from 'supertest'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../../app'
import { execSync } from 'child_process'
import { Db } from '../../../database/base-database'
import { hash } from 'bcryptjs'
import { KnexUsersRepository } from '../../../repositories/knex/users-knex-repository'

class FakePostsDb extends Db {
  constructor() {
    super()
  }
  async reset() {
    await Db.connection('posts').del()
    await Db.connection('users').del()
  }
}

describe('Delete Post Controller', async () => {
  let server: supertest.SuperTest<supertest.Test>
  const usersRepository = new KnexUsersRepository()
  let authToken

  const user = {
    name: 'test',
    password: 'testtest',
    email: 'test@gmail.com',
  }

  async function getToken(email: string, password: string): Promise<string> {
    const res = await server.post('/users/authenticate').send({
      email,
      password,
    })

    const token = res.body

    return token
  }

  beforeAll(() => {
    execSync('NODE_ENV=test && npm run knex:migrate')
    server = supertest(app)
  })

  afterAll(() => {
    execSync('NODE_ENV=test && npm run knex:rollback')
  })

  afterEach(async () => {
    const db = new FakePostsDb()
    await db.reset()
  })

  it.skip('should return 401 not authorized when no token is provided', async () => {
    await server
      .delete('/posts/:id')
      .expect(401)
      .then((response) => {
        expect(response.body).toBe('Not authorizated')
      })
  })

  it('should return 400 bad request when id is not provided', async () => {
    await usersRepository.create({
      name: user.name,
      email: user.email,
      password_hash: await hash(user.password, 6),
    })

    authToken = await getToken(user.email, user.password)

    await server
      .post('/posts/:id')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(400)
      .then((response) => {
        expect(response.body.message).toBe('Validation error')
      })
  })

  it.skip('should create a post when receive a valid token and a properly body', async () => {
    const userWithPost = await usersRepository.create({
      name: user.name,
      email: user.email,
      password_hash: await hash(user.password, 6),
    })

    authToken = await getToken(user.email, user.password)

    await server
      .post('/posts')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        content: 'some content',
        creator_id: userWithPost.id,
      })
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            content: 'some content',
            creator_id: userWithPost.id,
          }),
        )
      })
  })
})
