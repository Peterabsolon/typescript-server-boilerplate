import Router from '@koa/router'

import { userRouter } from './user'

const router = new Router()

router.get('/', (ctx) => {
  ctx.body = 'Hello World'
})

router.use('/users', userRouter.routes(), userRouter.allowedMethods())

export { router }
