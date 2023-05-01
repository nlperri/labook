import { Request, Response } from 'express'
import { z } from 'zod'
import { InvalidCredentialsError } from '../../use-cases/@errors/invalid-credentials-error'
import { TokenManager } from '../token-manager'
import { AuthenticateUseCase } from '../../use-cases/authenticate/authenticate'

export class AuthenticateController {
  constructor(
    private tokenManager: TokenManager,
    private authenticateUseCase: AuthenticateUseCase,
  ) {}
  async execute(req: Request, res: Response) {
    const authenticateBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    })

    const { email, password } = authenticateBodySchema.parse(req.body)

    try {
      const { user } = await this.authenticateUseCase.execute({
        email,
        password,
      })

      const token = this.tokenManager.createToken({
        id: user.id,
        name: user.name,
        role: user.role,
      })

      return res.status(200).send({
        token,
      })
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        res.status(error.statusCode).send(error.message)
      }
      throw error
    }
  }
}
