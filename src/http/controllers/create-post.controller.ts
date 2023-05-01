import { Request, Response } from 'express'
import { z } from 'zod'
import { ResourceNotFoundError } from '../../use-cases/@errors/resource-not-found-error'
import { CreatePostUseCase } from '../../use-cases/create-post/create-post'
import { USER_ROLES } from '../../@types/types'

export class CreatePostController {
  constructor(private createPostUseCase: CreatePostUseCase) {}
  async execute(req: Request, res: Response) {
    const createPostInputSchema = z.object({
      content: z.string(),
      user: z.object({
        id: z.string(),
        name: z.string(),
        role: z.enum([USER_ROLES.ADMIN, USER_ROLES.NORMAL]),
      }),
    })

    const { content, user } = createPostInputSchema.parse({
      content: req.body.content,
      user: req.user,
    })

    try {
      await this.createPostUseCase.execute({ content, userId: user.id })

      res.status(201).send()
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        res.status(error.statusCode).send(error.message)
      }
      throw error
    }
  }
}
