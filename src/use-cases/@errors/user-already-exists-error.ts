import { BaseError } from './base-error'

export class UserAlreadyExistsError extends BaseError {
  constructor(message: string = 'User already exists') {
    super(409, message)
  }
}
