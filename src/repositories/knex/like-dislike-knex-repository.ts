import { LikeDislikePostInput } from '../../@types/types'
import { Db } from '../../database/BaseDataBase'
import { likeDislikeRepository } from '../like-dislike-repository'

export class LikeDislikeKnexRepository
  extends Db
  implements likeDislikeRepository
{
  async create({ like, postId, userId }: LikeDislikePostInput) {
    const newLikeDislike = {
      like: like ? 1 : 2,
      post_id: postId,
      user_id: userId,
    }

    await Db.connection('likes_dislikes').insert(newLikeDislike)
  }

  async findByIds(postId: string, userId: string) {
    const post = await Db.connection('likes_dislikes')
      .where({
        post_id: postId,
        user_id: userId,
      })
      .first()

    return post
  }

  async delete(postId: string, userId: string) {
    await Db.connection('likes_dislikes').del().where({
      post_id: postId,
      user_id: userId,
    })
  }
  async update(postId: string, userId: string, likeOrDislike: number) {
    await Db.connection('likes_dislikes')
      .where({
        post_id: postId,
        user_id: userId,
      })
      .update({
        like: likeOrDislike,
      })
  }
}
