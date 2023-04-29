import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { TokenPayload } from '../@types/types'
import { env } from '../env'

dotenv.config()

export class TokenManager {
  public createToken = (payload: TokenPayload): string => {
    const token = jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN,
    })

    return token
  }

  public getPayload = (token: string): TokenPayload | null => {
    try {
      const payload = jwt.verify(token, env.JWT_SECRET)

      return payload as TokenPayload
    } catch (error) {
      return null
    }
  }
}
