import { z } from 'zod'
import { CreatePostUseCase } from '../../../use-cases/create-post/create-post'
import { Post as TPost, TokenPayload, USER_ROLES } from '../../../@types/types'
import { Post, Route, Body } from 'tsoa'
import { HttpResponse } from '../../response/response'

interface CreatePostRequestContent {
  requestContent: string
  requestUser: TokenPayload
}

@Route('posts')
export class CreatePostController {
  constructor(private createPostUseCase: CreatePostUseCase) {}
  @Post()
  async execute(
    @Body()
    { requestContent, requestUser }: CreatePostRequestContent,
  ): Promise<HttpResponse<TPost>> {
    const createPostInputSchema = z.object({
      content: z.string(),
      user: z.object({
        id: z.string(),
        name: z.string(),
        role: z.enum([USER_ROLES.ADMIN, USER_ROLES.NORMAL]),
      }),
    })

    const { content, user } = createPostInputSchema.parse({
      content: requestContent,
      user: requestUser,
    })

    const { post } = await this.createPostUseCase.execute({
      content,
      userId: user.id,
    })

    return new HttpResponse<TPost>(post, 201)
  }
}
