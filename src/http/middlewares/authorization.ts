import { NextFunction, Request, Response } from 'express'
import { TokenManager } from '../token-manager'
import { NotAuthorizatedError } from '../../use-cases/@errors/not-authorizated-error'

export class AuthenticationMiddleware {
  constructor(private tokenManager: TokenManager) {}

  async auth(req: Request, _: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      throw new NotAuthorizatedError()
    }

    try {
      const payload = this.tokenManager.getPayload(token)
      if (payload) {
        req.user = payload
        next()
      }
    } catch (error) {
      throw new NotAuthorizatedError()
    }
  }
}
