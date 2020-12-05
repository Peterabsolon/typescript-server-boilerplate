import Koa from 'koa'
import Router from 'koa-router'
import cors from '@koa/cors'

import { config } from './config'

const app = new Koa()
app.use(cors())

const router = new Router()
router.get('/', (ctx) => {
  ctx.body = 'Hello World'
})

app.use(router.routes())
app.use(router.allowedMethods())

const start = (): void => {
  app.listen(config.port, () => console.log(`Listening on ${config.port}`))
}

export const server = { start }
