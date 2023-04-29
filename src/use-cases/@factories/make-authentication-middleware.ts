import { AuthenticationMiddleware } from '../../http/middlewares/authorization'
import { TokenManager } from '../../http/token-manager'

export function makeAuthenticationMiddleware() {
  const tokenManager = new TokenManager()
  const authenticationMiddleware = new AuthenticationMiddleware(tokenManager)

  return authenticationMiddleware
}
