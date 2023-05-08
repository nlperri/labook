import { z } from 'zod'
import { TokenPayload, USER_ROLES } from '../../../@types/types'
import { DeletePostUseCase } from '../../../use-cases/delete-post/delete-post'
import { Route, Body, Delete, SuccessResponse } from 'tsoa'

interface DeletePostRequest {
  requestId: string
  requestUser: TokenPayload
}

@Route('posts')
export class DeletePostController {
  constructor(private deletePostUseCase: DeletePostUseCase) {}
  @SuccessResponse('200', 'Success')
  @Delete(':id')
  async execute(
    @Body()
    { requestId, requestUser }: DeletePostRequest,
  ): Promise<void> {
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
  }
}
