import z from 'zod'
import { MESSAGES } from '~/constants'
import type { FormDefaults } from '~/types'
import { idSchema, nameSchema } from '.'

const messages = MESSAGES.schema.match

export const createMatchSchema = z
  .object({
    name: nameSchema,
    tournamentId: idSchema,
    teamIds: z.tuple([idSchema, idSchema])
  })
  .refine(({ teamIds }) => teamIds[0] !== teamIds[1], {
    message: messages.refine,
    path: ['teamIds']
  })

export type CreateMatchSchema = z.output<typeof createMatchSchema>

export const createMatchState: FormDefaults<CreateMatchSchema> = {
  name: undefined,
  tournamentId: undefined,
  teamIds: [undefined, undefined]
}
