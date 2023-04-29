import { router } from '../app'
import { makeAuthenticationMiddleware } from '../use-cases/@factories/make-authentication-middleware'
import { makeRoutes } from '../use-cases/@factories/make-routes'

const { authenticate, register, createPost } = makeRoutes()
const authenticationMiddleware = makeAuthenticationMiddleware()
export async function appRoutes() {
  router.post('/posts', authenticationMiddleware.auth, createPost.execute)
}
