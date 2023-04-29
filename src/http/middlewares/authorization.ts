import { NextFunction, Request, Response } from 'express'
import { TokenManager } from '../token-manager'
import { NotAuthorizatedError } from '../../use-cases/@errors/not-authorizated-error'

export class AuthenticationMiddleware {
  constructor(private tokenManager: TokenManager) {}

  auth(req: Request, _: Response, next: NextFunction) {
    const token = req.headers.authorization as string

    const payload = this.tokenManager.getPayload(token)

    if (payload) {
      next()
    }

    throw new NotAuthorizatedError()
  }
}
