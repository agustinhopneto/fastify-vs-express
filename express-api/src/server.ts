import express, { json } from 'express'

import { env } from './env'
import { transactionRoutes } from './routes/transactions'

const app = express()

app.use(json())
app.use('/transactions', transactionRoutes)

app.listen(env.APP_PORT, () => {
  console.log(`EXPRESS server is running on port ${env.APP_PORT}!`)
})
