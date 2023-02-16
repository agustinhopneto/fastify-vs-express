import { Router } from 'express'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'

import { knex } from '../database'

export const transactionRoutes = Router()

transactionRoutes.post('/', async (request, response) => {
  const createTransactionBodySchema = z.object({
    title: z.string(),
    amount: z.number(),
    type: z.enum(['credit', 'debit']),
  })

  const { title, amount, type } = createTransactionBodySchema.parse(
    request.body,
  )

  const transactionId = randomUUID()

  await knex('transactions').insert({
    id: transactionId,
    title,
    amount: type === 'credit' ? amount : amount * -1,
  })

  return response.status(201).json({
    transaction: {
      id: transactionId,
    },
  })
})

transactionRoutes.get('/', async (_, response) => {
  const transactions = await knex('transactions').select()

  return response.status(200).json({
    transactions,
  })
})

transactionRoutes.get('/summary', async (_, response) => {
  const summary = await knex('transactions')
    .sum('amount', { as: 'amount' })
    .first()

  return response.status(200).json({ summary })
})

transactionRoutes.get('/:id', async (request, response) => {
  const getTransactionParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = getTransactionParamsSchema.parse(request.params)

  const transaction = await knex('transactions').where('id', id).first()

  return response.status(200).json({
    transaction,
  })
})
