import { Post, PostCreateInput } from '../@types/types'

export interface PostsRepository {
  create(data: PostCreateInput): Promise<Post>
}
