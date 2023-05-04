import { randomUUID } from 'crypto'
import { Post, PostCreateInput } from '../@types/types'

export class CreatePostDTO {
  private post: Post
  private constructor(data: PostCreateInput) {
    this.post = {
      id: randomUUID(),
      creator_id: data.creator_id,
      content: data.content,
      created_at: new Date().toISOString(),
    }
  }

  static build(input: PostCreateInput) {
    const { post } = new CreatePostDTO(input)
    return post
  }
}
