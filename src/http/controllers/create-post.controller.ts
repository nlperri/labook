import { z } from 'zod'
import { CreatePostUseCase } from '../../use-cases/create-post/create-post'
import { TokenPayload, USER_ROLES } from '../../@types/types'
import { Post, Route, Body } from 'tsoa'
import { HttpResponse } from '../response/response'

interface CreatePostRequestContent {
  content: string
}

@Route('posts')
export class CreatePostController {
  constructor(private createPostUseCase: CreatePostUseCase) {}
  @Post()
  async execute(
    @Body() requestContent: CreatePostRequestContent,
    requestUser: TokenPayload,
  ) {
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

    return new HttpResponse<void>(post, 201)
  }
}
