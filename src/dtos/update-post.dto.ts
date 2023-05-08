import { Post, PostEditInput, PostEditInputDTO } from '../@types/types'

export class UpdatePostDTO {
  private post: Post
  private constructor(data: PostEditInputDTO) {
    this.post = {
      ...data.post,
      content: data.content,
      updated_at: new Date().toISOString(),
    }
  }

  static build(input: PostEditInputDTO) {
    const { post } = new UpdatePostDTO(input)
    return post
  }
}
