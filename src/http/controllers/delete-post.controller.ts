import { z } from 'zod'
import { TokenPayload, USER_ROLES } from '../../@types/types'
import { DeletePostUseCase } from '../../use-cases/delete-post/delete-post'
import { Route, Body, Delete } from 'tsoa'
import { HttpResponse } from '../response/response'

@Route('posts')
export class DeletePostController {
  constructor(private deletePostUseCase: DeletePostUseCase) {}
  @Delete(':id')
  async execute(
    @Body()
    requestId: string,
    requestUser: TokenPayload,
  ) {
    const deletePostInputSchema = z.object({
      id: z.string(),
      user: z.object({
        id: z.string(),
        name: z.string(),
        role: z.enum([USER_ROLES.ADMIN, USER_ROLES.NORMAL]),
      }),
    })

    const { id, user } = deletePostInputSchema.parse({
      id: requestId,
      user: requestUser,
    })

    await this.deletePostUseCase.execute({
      id,
      user,
    })

    return new HttpResponse<void>('Post successfully deleted', 200)
  }
}
