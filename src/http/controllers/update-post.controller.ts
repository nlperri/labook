import { z } from 'zod'
import { TokenPayload, USER_ROLES } from '../../@types/types'
import { UpdatePostUseCase } from '../../use-cases/update-post/update-post'
import { Put, Route, Body } from 'tsoa'
import { HttpResponse } from '../response/response'

interface UpdatePostRequestContent {
  requestContent: string
  requestId: string
  requestUser: TokenPayload
}

@Route('posts')
export class UpdatePostController {
  constructor(private updatePostUseCase: UpdatePostUseCase) {}
  @Put(':id')
  async execute(
    @Body()
    { requestContent, requestId, requestUser }: UpdatePostRequestContent,
  ) {
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
      content: requestContent,
      id: requestId,
      user: requestUser,
    })

    const { post } = await this.updatePostUseCase.execute({
      id,
      content,
      user,
    })

    return new HttpResponse<void>(post, 200)
  }
}
