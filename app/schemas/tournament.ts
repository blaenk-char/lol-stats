import z from 'zod'
import { LABELS } from '~/constants'
import type { FormDefaults } from '~/types'
import { nameSchema, uniqueIds } from '.'

export const createTournamentSchema = z.object({
  name: nameSchema,
  teamIds: uniqueIds(5, LABELS.teams)
})

export type CreateTournamentSchema = z.output<typeof createTournamentSchema>

export const createTournamentState: FormDefaults<CreateTournamentSchema> = {
  name: undefined,
  teamIds: []
}
