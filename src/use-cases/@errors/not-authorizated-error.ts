import { BaseError } from './base-error'

export class NotAuthorizatedError extends BaseError {
  constructor(message: string = 'Not authorizated') {
    super(401, message)
  }
}
