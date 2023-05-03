import { Router } from 'express'
import express, { Response as ExResponse, Request as ExRequest } from 'express'

import swaggerUi from 'swagger-ui-express'

const docsRoutes = Router()

docsRoutes.use(
  '/docs',
  swaggerUi.serve,
  async (_req: ExRequest, res: ExResponse) => {
    return res.send(
      swaggerUi.generateHTML(await import('../docs/swagger.json')),
    )
  },
)
export default docsRoutes
