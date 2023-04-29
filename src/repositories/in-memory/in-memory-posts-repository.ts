import { randomUUID } from 'crypto'
import { Post, PostCreateInput, PostEditInput, User } from '../../@types/types'
import { PostsRepository } from '../posts-repository'
import { InMemoryUsersRepository } from './in-memory-users-repository'

export class InMemoryPostsRepository implements PostsRepository {
  constructor(private readonly userRepository: InMemoryUsersRepository) {}
  public items: Post[] = []

  async create({ content, creator_id }: PostCreateInput) {
    const post = {
      id: randomUUID(),
      creator_id,
      content: content,
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

    const post = { ...postToEdit, content, update: new Date() }

    return post
  }

  async fetch() {
    const users = this.userRepository.items
    const posts = await Promise.all(
      this.items.map(async (item) => {
        const id = item.id
        const content = item.content
        const likes = item.likes ?? 0
        const dislikes = item.dislikes ?? 0
        const createdAt = new Date(item.created_at).toISOString()
        const updatedAt = item.updated_at
          ? new Date(item.updated_at).toISOString()
          : 'no updates'
        const user = users.find((user) => user.id === item.creator_id)
        if (!user) {
          throw new Error('Post without user x.x')
        }
        const creator = {
          id: item.creator_id,
          name: user.id,
        }

        return { id, content, likes, dislikes, createdAt, updatedAt, creator }
      }),
    )

    return posts
  }

  async delete(id: string) {
    const postIndex = this.items.findIndex((item) => item.id === id)
    this.items.splice(postIndex, 1)
  }

  async like(id: string, shouldDecrement: boolean = false) {
    const post = await this.findById(id)

    if (!post) {
      throw new Error()
    }

    if (shouldDecrement) {
      const posts = this.items.map((item) => {
        if (item.id === post.id) {
          return {
            ...item,
            likes: item.likes
              ? item.likes - 1 === 0
                ? undefined
                : item.likes - 1
              : item.likes,
          }
        }
        return item
      })
      this.items = posts
      return
    }

    const posts = this.items.map((item) => {
      if (item.id === post.id) {
        return {
          ...item,
          likes: item.likes ? item.likes++ : 1,
        }
      }

      return item
    })

    this.items = posts
  }
  async dislike(id: string, shouldDecrement: boolean = false) {
    const post = await this.findById(id)

    if (!post) {
      throw new Error()
    }

    if (shouldDecrement) {
      const posts = this.items.map((item) => {
        if (item.id === post.id) {
          return {
            ...item,
            dislikes: item.dislikes
              ? item.dislikes - 1 === 0
                ? undefined
                : item.dislikes - 1
              : item.dislikes,
          }
        }
        return item
      })
      this.items = posts
      return
    }

    const posts = this.items.map((item) => {
      if (item.id === post.id) {
        return {
          ...item,
          dislikes: item.dislikes ? item.dislikes++ : 1,
        }
      }

      return item
    })
    this.items = posts
  }
}
