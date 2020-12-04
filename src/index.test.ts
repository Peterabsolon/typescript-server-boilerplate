import { pingDb } from './index'

describe('pingDb', () => {
  it('can ping db', async () => {
    const res = await pingDb()
    expect(res.version.slice(0, 15)).toBe('PostgreSQL 13.0')
  })
})
