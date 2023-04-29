import { randomUUID } from 'node:crypto'
import { PostCreateInput, PostEditInput } from '../../@types/types'
import { Db } from '../../database/BaseDataBase'
import { PostsRepository } from '../posts-repository'

export class PostsKnexRepository extends Db implements PostsRepository {
  async create({ content, creator_id }: PostCreateInput) {
    const newPost = {
      id: randomUUID(),
      creator_id,
      content,
      created_at: new Date().toISOString(),
    }

    await Db.connection('posts').insert(newPost)

    return newPost
  }

  async findById(id: string) {
    const [result] = await Db.connection('posts').where({ id })

    if (!result) {
      return null
    }

    return result
  }

  async update({ id, content }: PostEditInput) {
    const post = await this.findById(id)

    const postToUpdate = {
      ...post,
      content: content,
      updated_at: new Date().toISOString(),
    }

    await Db.connection('posts').update(postToUpdate).where({ id })

    return postToUpdate
  }

  async fetch() {
    const results = await Db.connection('posts')
      .select(
        'posts.id as id',
        'posts.content',
        'posts.likes',
        'posts.dislikes',
        'posts.created_at as createdAt',
        'posts.updated_at as updatedAt',
        Db.connection.raw(
          'JSON_OBJECT("id", "users.id", "name", "users.name") as creator',
        ),
      )
      .innerJoin('users', 'products.creator_id', '=', 'users.id')

    const formattedResult = results.map((result) => {
      const id = result.id
      const content = result.content
      const likes = result.likes ? result.likes : undefined
      const dislikes = result.dislikes ? result.dislikes : undefined
      const createdAt = result.createdAt
      const updatedAt = result.updatedAt ? result.updatedAt : undefined
      const creator = JSON.parse(result.creator)

      return { id, content, likes, dislikes, createdAt, updatedAt, creator }
    })

    return formattedResult
  }

  async delete(id: string) {
    await Db.connection('posts').del().where({ id })
  }

  async like(id: string, shouldDecrement: boolean = false) {
    const [post] = await this.findById(id)

    let updatedLikesCount = post.likes

    if (shouldDecrement) {
      updatedLikesCount = Math.max(0, (post.likes || 0) - 1)
    } else {
      updatedLikesCount = (post.likes || 0) + 1
    }

    await Db.connection('posts').where({ id }).update({
      likes: updatedLikesCount,
    })
  }

  async dislike(id: string, shouldDecrement: boolean = false) {
    const post = await this.findById(id)

    if (!post) {
      throw new Error()
    }

    let updatedDislikesCount = post.dislikes

    if (shouldDecrement) {
      updatedDislikesCount = Math.max(0, (post.dislikes || 0) - 1)
    } else {
      updatedDislikesCount = (post.dislikes || 0) + 1
    }

    await Db.connection('posts').where({ id }).update({
      dislikes: updatedDislikesCount,
    })
  }
}
