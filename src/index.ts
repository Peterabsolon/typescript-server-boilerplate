import { db } from './db'
import { server } from './server'

const bootstrap = async (): Promise<void> => {
  await db.connect()
  await db.migrate()
  server.start()
}

bootstrap()
