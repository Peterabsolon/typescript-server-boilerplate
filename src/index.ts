import { db } from './db'
import { app } from './app'
import { config } from './config'

const bootstrap = async (): Promise<void> => {
  await db.connect()
  await db.migrate()

  app.listen(config.port, () => console.log(`📡 Listening on http://localhost:${config.port}`))
}

bootstrap()
