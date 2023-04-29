import { LikeDislike, LikeDislikePostInput } from '../../@types/types'
import { likeDislikeRepository } from '../like-dislike-repository'
import { PostsRepository } from '../posts-repository'

export class InMemoryLikeDislikeRepository implements likeDislikeRepository {
  constructor(private postsRepository: PostsRepository) {}
  public items: LikeDislike[] = []
  async create({ like, postId, userId }: LikeDislikePostInput) {
    const newLikeDislike = {
      like: like ? 1 : 2,
      post_id: postId,
      user_id: userId,
    }

    this.items.push(newLikeDislike)
  }

  async findByIds(postId: string, userId: string) {
    const postAlreadyLiked = this.items.find((item) => {
      if (item.post_id === postId && item.user_id === userId) {
        return item
      }
    })

    return postAlreadyLiked
  }

  async delete(postId: string, userId: string) {
    const postIndex = this.items.findIndex((item) => {
      if (item.post_id === postId ?? item.user_id === userId) {
        return item
      }
    })

    this.items.splice(postIndex, 1)
  }
  async update(postId: string, userId: string, likeOrDislike: number) {
    const post = this.items.map((item) => {
      if (item.post_id === postId && item.user_id === userId) {
        return {
          ...item,
          like: likeOrDislike,
        }
      }
      return item
    })

    this.items = post
  }
}
