import { db } from '.'

describe('ping', () => {
  it('can ping db', async () => {
    const res = await db.ping()
    expect(res.version.slice(0, 15)).toBe('PostgreSQL 13.0')
  })
})
