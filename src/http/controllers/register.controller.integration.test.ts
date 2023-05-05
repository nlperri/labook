import supertest from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../app'
import { createNewDatabase } from '../../database/setup-database-file-system'

describe('Register Controller', () => {
  let server: supertest.SuperTest<supertest.Test>

  beforeAll(() => {
    createNewDatabase()
    server = supertest(app)
  })

  afterAll(() => {
    createNewDatabase()
    app.removeAllListeners()
  })

  it('should return 400 bad request when no body is provided', async () => {
    await server
      .post('/users/register')
      .expect(400)
      .then((response) => {
        expect(response.body.message).toBe('Validation error')
      })
  })
  it('should register a new user when recive a properly body', async () => {
    await server
      .post('/users/register')
      .send({
        name: 'test',
        password: 'testtest',
        email: 'test@gmail.com',
      })
      .then((response) => {
        console.log(response.body)
      })
  })
})
