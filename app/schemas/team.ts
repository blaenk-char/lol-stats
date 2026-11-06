import z from 'zod'
import { LABELS } from '~/constants'
import type { FormDefaults } from '~/types'
import { nameSchema, uniqueIds } from '.'

export const createTeamSchema = z.object({
  name: nameSchema,
  playerIds: uniqueIds(5, LABELS.roster)
})

export type CreateTeamSchema = z.output<typeof createTeamSchema>

export const createTeamState: FormDefaults<CreateTeamSchema> = {
  name: undefined,
  playerIds: []
}
