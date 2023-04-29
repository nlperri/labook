import express, { Router } from 'express'
import { appRoutes } from './http/routes'
import cors from 'cors'

import { errorMiddleware } from './http/middlewares/error'

export const app = express()
app.use(express.json())
app.use(cors())

export const router = Router()

app.use(router)

appRoutes()

app.use(errorMiddleware)
