import { ping } from '.'

describe('ping', () => {
  it('can ping db', async () => {
    const res = await ping()
    expect(res.version.slice(0, 15)).toBe('PostgreSQL 13.0')
  })
})
