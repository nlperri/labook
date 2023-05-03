import { router } from '../app'
import { makeAuthenticationMiddleware } from '../use-cases/@factories/make-authentication-middleware'
import { makeRoutes } from '../use-cases/@factories/make-routes'
import { HttpResponse } from './response/response'

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
  router.post('/users/register', async (req, res) => {
    const { payload, statusCode } = await register.execute(req.body)
    res.json(payload).status(statusCode)
  })

  router.post('/users/authenticate', async (req, res) => {
    const { payload, statusCode } = await authenticate.execute(req.body)
    res.json(payload).status(statusCode)
  })
  router.post(
    '/posts',
    (req, res, next) => authenticationMiddleware.auth(req, res, next),
    async (req, res) => {
      const { payload, statusCode } = await createPost.execute(
        req.body.content,
        req.user!,
      )
      res.json(payload).status(statusCode)
    },
  )
  router.get(
    '/posts',
    (req, res, next) => authenticationMiddleware.auth(req, res, next),
    async (_, res) => {
      const { payload, statusCode } = await fetchPosts.execute()
      res.json(payload).status(statusCode)
    },
  )
  router.put(
    '/posts/:id',
    (req, res, next) => authenticationMiddleware.auth(req, res, next),
    async (req, res) => {
      const { payload, statusCode } = await updatePosts.execute(
        req.body.content,
        req.params.id,
        req.user!,
      )
      res.json(payload).status(statusCode)
    },
  )
  router.delete(
    '/posts/:id',
    (req, res, next) => authenticationMiddleware.auth(req, res, next),
    async (req, res) => {
      const { payload, statusCode } = await deletePosts.execute(
        req.params.id,
        req.user!,
      )
      res.json(payload).status(statusCode)
    },
  )
  router.put(
    '/posts/:id/like',
    (req, res, next) => authenticationMiddleware.auth(req, res, next),
    async (req, res) => {
      const { payload, statusCode } = await likeDislikePosts.execute(
        req.body.like,
        req.params.id,
        req.user!,
      )
      res.json(payload).status(statusCode)
    },
  )
}
