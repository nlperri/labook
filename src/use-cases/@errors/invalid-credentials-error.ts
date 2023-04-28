import { BaseError } from './base-error'

export class InvalidCredentialsError extends BaseError {
  constructor(message: string = 'Invalid credentials') {
    super(409, message)
  }
}
