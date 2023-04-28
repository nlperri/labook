import express, { NextFunction, Request, Response, Router } from 'express'
import { appRoutes } from './http/routes'
import cors from 'cors'
import { ZodError } from 'zod'
import { env } from './env'

export const app = express()
app.use(express.json())
app.use(cors())

export const router = Router()

app.use(router)

appRoutes()

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof ZodError) {
    return response
      .status(400)
      .send({ message: 'Validation error', issues: err.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.log(err)
  } else {
    // TODO: Here should log to an external tool like DataDog/NewRelic/Sentry
  }

  return response.status(500).send({ message: 'Internal server error' })
})
