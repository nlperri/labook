import { AuthenticateController } from '../../http/controllers/authenticate/authenticate.controller'
import { CreatePostController } from '../../http/controllers/create-post/create-post.controller'
import { UpdatePostController } from '../../http/controllers/update-post/update-post.controller'
import { FetchPostsController } from '../../http/controllers/fetch-posts/fetch-posts.controller'
import { RegisterController } from '../../http/controllers/register/register.controller'
import { TokenManager } from '../../http/token-manager'
import { makeAuthenticateUseCase } from './make-authenticate-use-case'
import { makeCreatePostUseCase } from './make-create-post-use-case'
import { makeFetchPostsUseCase } from './make-fetch-posts-use-case'
import { makeRegisterUseCase } from './make-register-use-case'
import { makeUpdatePostUseCase } from './make-update-post-use-case'
import { makeDeletePostUseCase } from './make-delete-post-use-case'
import { DeletePostController } from '../../http/controllers/delete-post/delete-post.controller'
import { makeLikeDislikeUseCase } from './make-like-dislike-post'
import { LikeDislikePostController } from '../../http/controllers/like-dislike-post/like-dislike-post.controller'

export function makeRoutes() {
  const tokenManager = new TokenManager()
  const registerUseCase = makeRegisterUseCase()
  const authenticateUseCase = makeAuthenticateUseCase()
  const createPostUseCase = makeCreatePostUseCase()
  const fetchPostsUseCase = makeFetchPostsUseCase()
  const updatePostUseCase = makeUpdatePostUseCase()
  const deletePostUseCase = makeDeletePostUseCase()
  const likeDislikePostUseCase = makeLikeDislikeUseCase()
  const authenticate = new AuthenticateController(
    tokenManager,
    authenticateUseCase,
  )
  const register = new RegisterController(registerUseCase)
  const createPost = new CreatePostController(createPostUseCase)
  const fetchPosts = new FetchPostsController(fetchPostsUseCase)
  const updatePosts = new UpdatePostController(updatePostUseCase)
  const deletePosts = new DeletePostController(deletePostUseCase)
  const likeDislikePosts = new LikeDislikePostController(likeDislikePostUseCase)

  return {
    authenticate,
    register,
    createPost,
    fetchPosts,
    updatePosts,
    deletePosts,
    likeDislikePosts,
  }
}
