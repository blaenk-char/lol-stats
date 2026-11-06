import type { FirestoreDataConverter, QueryDocumentSnapshot } from 'firebase/firestore'
import type { WithId } from '~/types'

/**
 * Converts an object of T to a firebase object and a firebase object to an object T.
 */
export const converter = <T extends object>(): FirestoreDataConverter<WithId<T>, T> => ({
  toFirestore: (data) => {
    const { id: _id, ...rest } = data as WithId<T>
    return rest as T
  },
  fromFirestore: (snap: QueryDocumentSnapshot) =>
    ({ id: snap.id, ...(snap.data() as T) }) as WithId<T>
})
