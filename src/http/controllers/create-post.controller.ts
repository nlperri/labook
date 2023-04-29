import { Request, Response } from 'express'
import { z } from 'zod'
import { ResourceNotFoundError } from '../../use-cases/@errors/resource-not-found-error'
import { CreatePostUseCase } from '../../use-cases/create-post/create-post'

export class CreatePost {
  constructor(private createPostUseCase: CreatePostUseCase) {}
  async execute(req: Request, res: Response) {
    const createPostInputSchema = z.object({
      content: z.string(),
      userId: z.string(),
    })

    const { content, userId } = createPostInputSchema.parse(req.body)

    try {
      await this.createPostUseCase.execute({ content, userId })

      res.status(201).send()
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        res.status(error.statusCode).send(error.message)
      }
      throw error
    }
  }
}
