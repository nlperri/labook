import { LikeDislike, LikeDislikePostInput } from '../@types/types'

export interface likeDislikeRepository {
  create(data: LikeDislikePostInput): Promise<void>
  findByIds(postId: string, userId: string): Promise<LikeDislike | undefined>
  delete(postId: string, userId: string): Promise<void>
  update(postId: string, userId: string, likeOrDislike: number): Promise<void>
}
