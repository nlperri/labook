import { FetchPostsUseCase } from '../../../use-cases/fetch-posts/fetch-posts'
import { Route, Get } from 'tsoa'
import { HttpResponse } from '../../response/response'

@Route('posts')
export class FetchPostsController {
  constructor(private fetchPostsUseCase: FetchPostsUseCase) {}
  @Get()
  async execute() {
    const { posts } = await this.fetchPostsUseCase.execute()

    return new HttpResponse(posts, 200)
  }
}
