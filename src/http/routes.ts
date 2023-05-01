import { router } from '../app'
import { makeAuthenticationMiddleware } from '../use-cases/@factories/make-authentication-middleware'
import { makeRoutes } from '../use-cases/@factories/make-routes'

const {
  authenticate,
  register,
  createPost,
  fetchPosts,
  updatePosts,
  deletePosts,
  likeDislikePosts,
} = makeRoutes()
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
  router.get(
    '/posts',
    (req, res, next) => authenticationMiddleware.auth(req, res, next),
    (req, res) => {
      fetchPosts.execute(req, res)
    },
  )
  router.put(
    '/posts/:id',
    (req, res, next) => authenticationMiddleware.auth(req, res, next),
    (req, res) => {
      updatePosts.execute(req, res)
    },
  )
  router.delete(
    '/posts/:id',
    (req, res, next) => authenticationMiddleware.auth(req, res, next),
    (req, res) => {
      deletePosts.execute(req, res)
    },
  )
  router.put(
    '/posts/:id/like',
    (req, res, next) => authenticationMiddleware.auth(req, res, next),
    (req, res) => {
      likeDislikePosts.execute(req, res)
    },
  )
}
