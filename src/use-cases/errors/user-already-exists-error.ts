import { BaseError } from './base-error'

export class UserAlreadyExistsError extends BaseError {
  constructor(message: string = 'Recurso não encontrado') {
    super(409, message)
  }
}
