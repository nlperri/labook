import express from 'express'
import 'express-async-errors'
import { appRoutes } from './http/routes'
import cors from 'cors'
import { errorMiddleware } from './http/middlewares/error'
import docsRoutes from './docs'
import { RegisterRoutes } from '../docs/routes'

export const app = express()
app.use(express.json())
app.use(cors())

export const router = express.Router()

app.use(docsRoutes)
app.use(router)

appRoutes()
app.use(errorMiddleware)

RegisterRoutes(app)

app.use(errorMiddleware)
