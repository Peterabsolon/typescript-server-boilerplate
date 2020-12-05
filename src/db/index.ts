import { Client } from 'pg'
import knex from 'knex'
import path from 'path'

import { config } from '../config'

const client = new Client(config.pg)

const connect = async (): Promise<void> => {
  await client.connect()
}

const migrate = async (): Promise<void> => {
  const knexClient = knex({
    client: 'pg',
    connection: config.pg,
    migrations: { directory: path.resolve(__dirname, 'migrations') },
  })

  await knexClient.migrate.latest()

  console.log('✨ Database migrated')
}

const ping = async (): Promise<{ version: string }> => {
  client.connect()
  const res = await client.query('SELECT version() AS version')
  client.end()
  return res.rows[0]
}

export const db = { connect, client, migrate, ping }
