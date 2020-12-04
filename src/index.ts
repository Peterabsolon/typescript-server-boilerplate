/* eslint-disable import/first */

require('dotenv').config()

import * as db from './db'

const bootstrap = (): void => {
  db.connect()
}

bootstrap()
