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
  if (!ctx.request.body.name) {
    ctx.body = 'Name missing'
    ctx.status = 422
    return
  }

  const res = await db.client.query(`
    INSERT INTO
      users(name)
    VALUES
      ('${ctx.request.body.name}')
    RETURNING
      *
  `)

  const user = res.rows[0]
  ctx.body = user
})

// Update
router.put('/:id', async (ctx) => {
  if (!ctx.request.body.name) {
    ctx.body = 'Name missing'
    ctx.status = 422
    return
  }

  const res = await db.client.query(`
    UPDATE
      users u
    SET
      name = '${ctx.request.body.name}'
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
