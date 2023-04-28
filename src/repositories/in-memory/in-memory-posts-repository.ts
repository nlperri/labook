import { randomUUID } from 'crypto'
import { Post, PostCreateInput } from '../../@types/types'
import { PostsRepository } from '../posts-repository'

export class InMemoryPostsRepository implements PostsRepository {
  public items: Post[] = []

  async create(data: PostCreateInput) {
    const post = {
      id: randomUUID(),
      creator_id: 'user-01',
      content: data.content,
      created_at: new Date(),
    }
    this.items.push(post)

    return post
  }
}
