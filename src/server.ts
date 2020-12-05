import Koa from 'koa'
import Router from '@koa/router'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'

import { config } from './config'
import { userRouter } from './routes'

const app = new Koa()
app.use(cors())
app.use(bodyParser())

const router = new Router()

router.get('/', (ctx) => {
  ctx.body = 'Hello World'
})

router.use('/users', userRouter.routes(), userRouter.allowedMethods())

app.use(router.routes())
app.use(router.allowedMethods())

const start = (): void => {
  app.listen(config.port, () => console.log(`📡 Listening on ${config.port}`))
}

export const server = { start }
