import { AuthenticateController } from '../../http/controllers/authenticate.controller'
import { CreatePostController } from '../../http/controllers/create-post.controller'
import { RegisterController } from '../../http/controllers/register.controller'
import { TokenManager } from '../../http/token-manager'
import { makeAuthenticateUseCase } from './make-authenticate-use-case'
import { makeCreatePostUseCase } from './make-create-post-use-case'
import { makeRegisterUseCase } from './make-register-use-case'

export function makeRoutes() {
  const tokenManager = new TokenManager()
  const registerUseCase = makeRegisterUseCase()
  const authenticateUseCase = makeAuthenticateUseCase()
  const createPostUseCase = makeCreatePostUseCase()
  const authenticate = new AuthenticateController(
    tokenManager,
    authenticateUseCase,
  )
  const register = new RegisterController(registerUseCase)
  const createPost = new CreatePostController(createPostUseCase)

  return { authenticate, register, createPost }
}
