export type User = {
  id: string
  name: string
  email: string
  password_hash: string
  created_at: Date | string
  role: string
}

export type UserCreateInput = {
  id?: string
  name: string
  email: string
  password_hash: string
  created_at?: Date | string
  role?: string
}

export type Post = {
  id: string
  creator_id: string
  content: string
  likes?: number
  deslikes?: number
  created_at: Date | string
  updated_at?: Date | string
}

export type PostCreateInput = {
  id?: string
  creator_id?: string
  content: string
  likes?: number
  deslikes?: number
  created_at?: Date | string
  updated_at?: Date | string
}
