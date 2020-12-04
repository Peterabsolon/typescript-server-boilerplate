import path from 'path'

import { config } from '../config'

module.exports = {
  development: {
    client: 'pg',
    connection: config.pg,
    migrations: {
      directory: path.resolve(__dirname, 'migrations'),
    },
  },

  test: {
    client: 'pg',
    connection: config.pg,
    migrations: {
      directory: path.resolve(__dirname, 'migrations'),
    },
    pool: {
      min: 2,
      max: 10,
    },
  },

  production: {
    client: 'pg',
    connection: config.pg,
    migrations: {
      directory: path.resolve(__dirname, 'migrations'),
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
}
