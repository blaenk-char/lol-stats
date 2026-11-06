import z from 'zod'
import type { FormDefaults } from '~/types'
import { nameSchema } from '.'

export const createChampionSchema = z.object({
  name: nameSchema
})

export type CreateChampionSchema = z.output<typeof createChampionSchema>

export const createChampionState: FormDefaults<CreateChampionSchema> = {
  name: undefined
}
