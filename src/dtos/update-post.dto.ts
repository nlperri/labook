import { Post, PostEditInput } from '../@types/types'

export class UpdatePostDTO {
  private post: Post
  private constructor(data: PostEditInput) {
    this.post = {
      ...data.post,
      content: data.content,
      updated_at: new Date().toISOString(),
    }
  }

  static build(input: PostEditInput) {
    const { post } = new UpdatePostDTO(input)
    return post
  }
}
