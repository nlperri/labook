import { Request, Response } from 'express'
import { z } from 'zod'
import { ResourceNotFoundError } from '../../use-cases/@errors/resource-not-found-error'
import { USER_ROLES } from '../../@types/types'
import { LikeDislikePostUseCase } from '../../use-cases/like-dislike-post.ts/like-dislike-post'
import { UserNotAllowed } from '../../use-cases/@errors/user-not-alowed-error'

export class LikeDislikePostController {
  constructor(private likeDislikePostUseCase: LikeDislikePostUseCase) {}
  async execute(req: Request, res: Response) {
    const likeDislikePostInputSchema = z.object({
      like: z.boolean(),
      postId: z.string(),
      user: z.object({
        id: z.string(),
        name: z.string(),
        role: z.enum([USER_ROLES.ADMIN, USER_ROLES.NORMAL]),
      }),
    })

    const { like, user, postId } = likeDislikePostInputSchema.parse({
      like: req.body.like,
      user: req.user,
      postId: req.params.id,
    })

    try {
      await this.likeDislikePostUseCase.execute({
        like,
        postId,
        userId: user.id,
      })

      res.status(200).send()
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
