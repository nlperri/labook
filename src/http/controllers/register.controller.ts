import { Request, Response } from 'express'
import { z } from 'zod'
import { UserAlreadyExistsError } from '../../use-cases/@errors/user-already-exists-error'
import { RegisterUseCase } from '../../use-cases/register/register'

export class RegisterController {
  constructor(private registerUseCase: RegisterUseCase) {}
  async execute(req: Request, res: Response) {
    const registerBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    })
    const { name, email, password } = registerBodySchema.parse(req.body)

    try {
      await this.registerUseCase.execute({ name, email, password })

      res.status(201).send('User successfully registered')
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        res.status(error.statusCode).send(error.message)
      }
      throw error
    }
  }
}
