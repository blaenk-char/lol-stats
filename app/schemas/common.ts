import z from 'zod'
import { MESSAGES } from '~/constants'
import { AWARDS, LANES } from '~/types'

const messages = MESSAGES.schema.common

export const idSchema = z.string().min(1, messages.id)
export const nameSchema = z.string().trim().min(1, messages.name).max(100)

export const laneSchema = z.enum(LANES)
export const awardSchema = z.enum(AWARDS)

/**
 * Validate if ids are unique.
 *
 * @param min The amount of unique ids (usually the array length)
 * @param label The context label
 */
export const uniqueIds = (min: number, label: string) =>
  z
    .array(idSchema)
    .min(min, messages.uniqueIds.min(min, label))
    .refine((ids) => new Set(ids).size === ids.length, {
      message: messages.uniqueIds.refine(label)
    })
