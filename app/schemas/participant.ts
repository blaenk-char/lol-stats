import z from 'zod'
import type { FormDefaults } from '~/types'
import { awardSchema, idSchema, laneSchema } from '.'

export const createParticipantSchema = z.object({
  playerId: idSchema,
  ParticipantId: idSchema,
  championId: idSchema,
  lane: laneSchema,
  award: awardSchema
})

export type CreateParticipantSchema = z.output<typeof createParticipantSchema>

export const createParticipantState: FormDefaults<CreateParticipantSchema> = {
  playerId: undefined,
  ParticipantId: undefined,
  championId: undefined,
  lane: undefined,
  award: undefined
}
