import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import { env } from '../../env'
import { BaseError } from '../../use-cases/@errors/base-error'

export async function errorMiddleware(
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction,
) {
  if (err instanceof ZodError) {
    return response
      .status(400)
      .send({ message: 'Validation error', issues: err.format() })
  }

  if (err instanceof BaseError) {
    return response.status(err.statusCode).json(err.message)
  }

  if (env.NODE_ENV !== 'production') {
    console.log(err)
  } else {
    // TODO: Here should log to an external tool like DataDog/NewRelic/Sentry
  }

  return response.status(500).send({ message: 'Internal server error' })
}
