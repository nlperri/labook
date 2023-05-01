import { Request, Response } from 'express'
import { z } from 'zod'
import { ResourceNotFoundError } from '../../use-cases/@errors/resource-not-found-error'
import { USER_ROLES } from '../../@types/types'
import { UpdatePostUseCase } from '../../use-cases/update-post/update-post'
import { UserNotAllowed } from '../../use-cases/@errors/user-not-alowed-error'

export class UpdatePostController {
  constructor(private updatePostUseCase: UpdatePostUseCase) {}
  async execute(req: Request, res: Response) {
    const updatePostInputSchema = z.object({
      content: z.string(),
      id: z.string(),
      user: z.object({
        id: z.string(),
        name: z.string(),
        role: z.enum([USER_ROLES.ADMIN, USER_ROLES.NORMAL]),
      }),
    })

    const { id, content, user } = updatePostInputSchema.parse({
      content: req.body.content,
      id: req.params.id,
      user: req.user,
    })

    try {
      const { post } = await this.updatePostUseCase.execute({
        id,
        content,
        user,
      })

      res.status(200).send(post)
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        res.status(error.statusCode).send(error.message)
      }
      if (error instanceof UserNotAllowed) {
        res.status(error.statusCode).send(error.message)
      }
      throw error
    }
  }
}
