import { GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut } from 'firebase/auth'
import type { User } from 'firebase/auth'

/**
 * Shared auth state. `isAdmin` reflects the `admin` custom claim in the
 * user's ID token (set with `pnpm set-admin`). UI-only: Firestore rules
 * enforce the real restriction.
 */
export const useAuth = () => {
  const { $auth } = useNuxtApp()

  const user = useState<User | null>('auth-user', () => null)
  const isAdmin = useState<boolean>('auth-is-admin', () => false)
  const ready = useState<boolean>('auth-ready', () => false)

  if (import.meta.client && !ready.value) {
    onIdTokenChanged($auth, async (u) => {
      user.value = u
      isAdmin.value = u ? (await u.getIdTokenResult()).claims.admin === true : false
      ready.value = true
    })
  }

  const login = () => signInWithPopup($auth, new GoogleAuthProvider())

  const logout = () => signOut($auth)

  /** Forces a token refresh, e.g. right after the claim was granted. */
  const refresh = async () => {
    if ($auth.currentUser) {
      await $auth.currentUser.getIdToken(true)
      isAdmin.value = (await $auth.currentUser.getIdTokenResult()).claims.admin === true
    }
  }

  return { user, isAdmin, ready, login, logout, refresh }
}
