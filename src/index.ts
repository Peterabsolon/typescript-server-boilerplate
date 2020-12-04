/* eslint-disable import/first, @typescript-eslint/no-var-requires */

require('dotenv').config()

import * as db from './db'
import * as server from './server'

const bootstrap = async (): Promise<void> => {
  await db.connect()

  server.listen()
}

bootstrap()
