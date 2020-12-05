import dotenv from 'dotenv'

dotenv.config()

export const config = {
  port: process.env.PORT || 8080,

  pg: {
    version: '13.0',
    host: process.env.PGHOST || 'localhost',
    database: process.env.PGDATABASE || 'postgres',
    port: Number(process.env.PGPORT) || 5433,
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'postgres',
  },
}
