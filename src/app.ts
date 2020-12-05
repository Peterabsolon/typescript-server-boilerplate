import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import { ApolloServer } from 'apollo-server-koa'
import { readFileSync } from 'fs'

import { router } from './routes'
import { resolvers } from './resolvers'

const app = new Koa()

app.use(cors())
app.use(bodyParser())

const typeDefs = readFileSync('./src/schema.gql').toString()
const graphql = new ApolloServer({ typeDefs, resolvers })
const graphqlHandler = graphql.getMiddleware()

router.post('/graphql', graphqlHandler)
router.get('/graphql', graphqlHandler)

app.use(router.routes())
app.use(router.allowedMethods())

export { app }
