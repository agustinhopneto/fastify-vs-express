import fastify from 'fastify'

import { env } from './env'
import { transactionRoutes } from './routes/transactions'

const app = fastify()

app.register(transactionRoutes, {
  prefix: 'transactions',
})

app
  .listen({
    port: env.APP_PORT,
  })
  .then(() => {
    console.log(`FASTIFY server is running on port ${env.APP_PORT}!`)
  })
