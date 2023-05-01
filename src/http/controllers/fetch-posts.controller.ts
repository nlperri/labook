import { Request, Response } from 'express'
import { FetchPostsUseCase } from '../../use-cases/fetch-posts/fetch-posts'

export class FetchPostsController {
  constructor(private fetchPostsUseCase: FetchPostsUseCase) {}
  async execute(_: Request, res: Response) {
    try {
      const { posts } = await this.fetchPostsUseCase.execute()

      res.status(201).send(posts)
    } catch (error) {
      throw error
    }
  }
}
