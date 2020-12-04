import { config } from './config'

const listen = (): void => {
  console.log(`Listening on ${config.port}`)
}

export { listen }
