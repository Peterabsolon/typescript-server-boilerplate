import Router from '@koa/router'

import { db } from '../db'

const router = new Router()

// List
router.get('/', async (ctx) => {
  const users = await db.client.query('SELECT * FROM users')
  ctx.body = users.rows
})

// One
router.get('/:id', async (ctx) => {
  const res = await db.client.query(`SELECT * FROM users u WHERE u.id = ${ctx.params.id}`)
  const user = res.rows[0]
  ctx.body = user
})

// Create
router.post('/', async (ctx) => {
  console.log('ctx', ctx.request.body)

  if (!ctx.request.body.title) {
    ctx.body = 'Title missing'
    ctx.status = 422
    return
  }

  const res = await db.client.query(`
    INSERT INTO
      users(title)
    VALUES
      ('${ctx.request.body.title}')
    RETURNING
      *
  `)

  const user = res.rows[0]
  ctx.body = user
})

// Update
router.put('/:id', async (ctx) => {
  if (!ctx.request.body.title) {
    ctx.body = 'Title missing'
    ctx.status = 422
    return
  }

  const res = await db.client.query(`
    UPDATE
      users u
    SET
      title = '${ctx.request.body.title}'
    WHERE
      u.id = ${ctx.params.id}
    RETURNING
      *
  `)

  if (!res.rowCount) {
    ctx.body = 'User not found'
    ctx.status = 404
    return
  }

  const user = res.rows[0]
  ctx.body = user
})

// Delete
router.delete('/:id', async (ctx) => {
  const res = await db.client.query(`
    DELETE FROM
      users u
    WHERE
      u.id = ${ctx.params.id}
  `)

  if (!res.rowCount) {
    ctx.body = 'User not found'
    ctx.status = 404
    return
  }

  ctx.body = 'User deleted'
})

export { router as userRouter }
