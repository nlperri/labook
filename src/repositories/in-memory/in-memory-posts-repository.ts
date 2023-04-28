import { randomUUID } from 'crypto'
import { Post, PostCreateInput, PostEditInput } from '../../@types/types'
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

  async findById(id: string) {
    const post = this.items.find((item) => item.id === id)

    if (!post) {
      return null
    }

    return post
  }

  async update({ id, content }: PostEditInput) {
    const postToEdit = this.items.find((item) => item.id === id)

    if (!postToEdit) {
      return null
    }

    const post = { ...postToEdit, content }

    return post
  }
}
