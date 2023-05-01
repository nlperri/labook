import { Request, Response } from 'express'
import { z } from 'zod'
import { ResourceNotFoundError } from '../../use-cases/@errors/resource-not-found-error'
import { USER_ROLES } from '../../@types/types'
import { UserNotAllowed } from '../../use-cases/@errors/user-not-alowed-error'
import { DeletePostUseCase } from '../../use-cases/delete-post/delete-post'

export class DeletePostController {
  constructor(private deletePostUseCase: DeletePostUseCase) {}
  async execute(req: Request, res: Response) {
    const deletePostInputSchema = z.object({
      id: z.string(),
      user: z.object({
        id: z.string(),
        name: z.string(),
        role: z.enum([USER_ROLES.ADMIN, USER_ROLES.NORMAL]),
      }),
    })

    const { id, user } = deletePostInputSchema.parse({
      id: req.params.id,
      user: req.user,
    })

    try {
      await this.deletePostUseCase.execute({
        id,
        user,
      })

      res.status(200).send('Post successfully deleted')
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
