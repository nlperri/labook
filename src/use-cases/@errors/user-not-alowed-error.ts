import { BaseError } from './base-error'

export class UserNotAllowed extends BaseError {
  constructor(message: string = 'Method not allowed') {
    super(405, message)
  }
}
