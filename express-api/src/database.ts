import { knex as setupKnex, Knex } from 'knex'
import { env } from './env'

export const dbOptions: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: env.DATABASE_URL,
  },
  useNullAsDefault: false,
  migrations: {
    extension: 'ts',
    directory: './database/migrations',
  },
}

export const knex = setupKnex(dbOptions)
