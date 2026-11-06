export const LANES = ['top', 'jungle', 'mid', 'bot', 'support'] as const
export type Lane = (typeof LANES)[number]

export const AWARDS = ['mvp', 'svp', 'none'] as const
export type Award = (typeof AWARDS)[number]

export type WithId<T> = { id: string } & T

export type FormDefaults<T> = T extends object
  ? { [K in keyof T]: FormDefaults<T[K]> | undefined }
  : T
