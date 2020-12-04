import { Client } from 'pg'

export const pingDb = async (): Promise<{ version: string }> => {
  const client = new Client({
    port: 5433,
    user: 'postgres',
    password: 'postgres',
  })

  await client.connect()

  const res = await client.query('SELECT version() as version')

  return res.rows[0]
}

pingDb()
