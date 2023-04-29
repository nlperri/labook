import { likeDislikeRepository } from '../../repositories/like-dislike-repository'
import { PostsRepository } from '../../repositories/posts-repository'
import { UsersRepository } from '../../repositories/users-repository'
import { ResourceNotFoundError } from '../@errors/resource-not-found-error'
import { UserNotAllowed } from '../@errors/user-not-alowed-error'

const LIKE = 1
const DISLIKE = 2

interface LikeDislikePostUseCaseRequest {
  like: boolean
  postId: string
  userId: string
}

export class LikeDislikePostUseCase {
  constructor(
    private likeDislikeRepository: likeDislikeRepository,
    private postsRepository: PostsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    like,
    postId,
    userId,
  }: LikeDislikePostUseCaseRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId)
    const post = await this.postsRepository.findById(postId)

    if (!post || !user) {
      throw new ResourceNotFoundError()
    }

    if (post.creator_id === userId) {
      throw new UserNotAllowed()
    }

    const isPostAlreadyLikedOrDisliked =
      await this.likeDislikeRepository.findByIds(postId, userId)

    if (!isPostAlreadyLikedOrDisliked) {
      await this.likeDislikeRepository.create({
        like,
        postId,
        userId,
      })
      return
    }

    const likeInDatabase = await this.likeDislikeRepository.findByIds(
      postId,
      userId,
    )
    const isLikedInDatabase = likeInDatabase?.like === LIKE
    const isDislikedInDatabase = likeInDatabase?.like === DISLIKE

    const isLikeTrueAndAlreadyLiked = like && isLikedInDatabase
    const isDislikeTrueAndAlreadyDisliked = !like && isDislikedInDatabase
    if (isLikeTrueAndAlreadyLiked) {
      await this.likeDislikeRepository.delete(postId, userId)
      await this.postsRepository.like(postId, true)
      return
    }

    const isLikeFalseAndAlreadyDisliked = !like && isDislikedInDatabase
    if (isLikeFalseAndAlreadyDisliked) {
      await this.likeDislikeRepository.delete(postId, userId)
      await this.postsRepository.dislike(postId, true)
      return
    }

    const isPostDislikedAndUserWantToLike =
      isDislikeTrueAndAlreadyDisliked && like
    if (isPostDislikedAndUserWantToLike) {
      await this.postsRepository.like(postId)
      await this.postsRepository.dislike(postId, true)
      await this.likeDislikeRepository.update(postId, userId, LIKE)
      return
    }

    const isPostLikedAndUserWantToDislike = isLikeTrueAndAlreadyLiked && !like
    if (isPostLikedAndUserWantToDislike) {
      await this.postsRepository.like(postId, true)
      await this.postsRepository.dislike(postId)
      await this.likeDislikeRepository.update(postId, userId, DISLIKE)

      return
    }
  }
}
