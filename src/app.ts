import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import { ApolloServer } from 'apollo-server-koa'

import { router } from './routes'
import { schema } from './schema'

const app = new Koa()

app.use(cors())
app.use(bodyParser())

const graphql = new ApolloServer({ schema })
const graphqlHandler = graphql.getMiddleware()

router.post('/graphql', graphqlHandler)
router.get('/graphql', graphqlHandler)

app.use(router.routes())
app.use(router.allowedMethods())

export { app }
