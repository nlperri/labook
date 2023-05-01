export type User = {
  id: string
  name: string
  email: string
  password: string
  created_at: Date | string
  role: USER_ROLES
}

export enum USER_ROLES {
  NORMAL = 'NORMAL',
  ADMIN = 'ADMIN',
}

export interface TokenPayload {
  id: string
  name: string
  role: USER_ROLES
}

export type Post = {
  id: string
  creator_id: string
  content: string
  likes?: number
  dislikes?: number
  created_at: Date | string
  updated_at?: Date | string
}

export type LikeDislike = {
  user_id: string
  post_id: string
  like: number
}

export type UserCreateInput = {
  id?: string
  name: string
  email: string
  password_hash: string
  created_at?: Date | string
  role?: string
}

export type PostCreateInput = {
  creator_id: string
  content: string
}

export type PostEditInput = {
  id: string
  creator_id?: string
  content: string
}

export type FetchPostsOutput = {
  id: string
  content: string
  likes: number
  dislikes: number
  createdAt: string
  updatedAt?: string
  creator: {
    id: string
    name: string
  }
}

export type LikeDislikePostInput = {
  userId: string
  postId: string
  like: boolean
}
