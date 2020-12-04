/* eslint-disable import/first, @typescript-eslint/no-var-requires */

require('dotenv').config()

import { Client } from 'pg'

import { config } from '../config'

const client = new Client(config.pg)

const connect = async (): Promise<void> => {
  await client.connect()
}

const ping = async (): Promise<{ version: string }> => {
  client.connect()
  const res = await client.query('SELECT version() AS version')
  client.end()
  return res.rows[0]
}

export { connect, client, ping }
