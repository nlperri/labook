import { Authenticate } from '../../http/controllers/authenticate.controller'
import { CreatePost } from '../../http/controllers/create-post.controller'
import { Register } from '../../http/controllers/register.controller'
import { TokenManager } from '../../http/token-manager'
import { makeAuthenticateUseCase } from './make-authenticate-use-case'
import { makeCreatePostUseCase } from './make-create-post-use-case'
import { makeRegisterUseCase } from './make-register-use-case'

export function makeRoutes() {
  const tokenManager = new TokenManager()
  const registerUseCase = makeRegisterUseCase()
  const authenticateUseCase = makeAuthenticateUseCase()
  const createPostUseCase = makeCreatePostUseCase()
  const authenticate = new Authenticate(tokenManager, authenticateUseCase)
  const register = new Register(registerUseCase)
  const createPost = new CreatePost(createPostUseCase)

  return { authenticate, register, createPost }
}
