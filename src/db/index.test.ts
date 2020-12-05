import { db } from '.'

import { config } from '../config'

describe('ping', () => {
  it('can ping db', async () => {
    const res = await db.ping()
    expect(res.version.slice(0, 15)).toBe(`PostgreSQL ${config.pg.version}`)
  })
})
