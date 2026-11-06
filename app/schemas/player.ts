import z from 'zod'
import type { FormDefaults } from '~/types'
import { nameSchema } from '.'

export const createPlayerSchema = z.object({
  name: nameSchema
})

export type CreatePlayerSchema = z.output<typeof createPlayerSchema>

export const createPlayerState: FormDefaults<CreatePlayerSchema> = {
  name: undefined
}
