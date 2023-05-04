import { LikeDislike, LikeDislikePostInput } from '../@types/types'

export class CreateLikeDislikeDTO {
  private likeDislike: LikeDislike
  private constructor(data: LikeDislikePostInput) {
    this.likeDislike = {
      like: data.like ? 1 : 2,
      post_id: data.postId,
      user_id: data.userId,
    }
  }

  static build(input: LikeDislikePostInput) {
    const { likeDislike } = new CreateLikeDislikeDTO(input)
    return likeDislike
  }
}
