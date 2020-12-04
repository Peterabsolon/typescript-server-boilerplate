export const config = {
  pg: {
    version: '13.0',
    port: Number(process.env.PGPORT) || 5433,
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASS || 'postgres',
  },
}
