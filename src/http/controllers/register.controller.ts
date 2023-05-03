import { z } from 'zod'
import { RegisterUseCase } from '../../use-cases/register/register'
import { Body, Post, Response, Route } from 'tsoa'
import { HttpResponse } from '../response/response'

interface RegisterRequestBody {
  name: string
  email: string
  password: string
}

@Route('users')
export class RegisterController {
  constructor(private registerUseCase: RegisterUseCase) {}
  @Post('register')
  @Response('201')
  async execute(@Body() body: RegisterRequestBody) {
    const registerBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    })
    const { name, email, password } = registerBodySchema.parse(body)
    const user = await this.registerUseCase.execute({
      name,
      email,
      password,
    })

    return new HttpResponse<void>(user, 201)
  }
}
