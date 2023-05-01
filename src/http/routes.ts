import { router } from '../app'
import { makeAuthenticationMiddleware } from '../use-cases/@factories/make-authentication-middleware'
import { makeRoutes } from '../use-cases/@factories/make-routes'

const { authenticate, register, createPost } = makeRoutes()
const authenticationMiddleware = makeAuthenticationMiddleware()

export async function appRoutes() {
  router.post('/users/register', (req, res) => {
    register.execute(req, res)
  })
  router.post('/users/authenticate', (req, res) => {
    authenticate.execute(req, res)
  })
  router.post(
    '/posts',
    (req, res, next) => authenticationMiddleware.auth(req, res, next),
    (req, res) => {
      createPost.execute(req, res)
    },
  )
}
