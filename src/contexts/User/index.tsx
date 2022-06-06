import type { User } from 'firebase/auth'
import { onAuthStateChanged } from 'firebase/auth'
import type { FC } from 'react'
import { useMemo, createContext, useContext, useEffect, useState } from 'react'

import { firebaseAuth } from 'services/firebase'

export type UserContextType =
  | {
      user: User
      isLoggedIn: true
    }
  | {
      user: null
      isLoggedIn: false
    }

const UserContext = createContext<UserContextType>({
  user: null,
  isLoggedIn: false,
})

export const UserProvider: FC = ({ children }) => {
  const [user, setUser] = useState<UserContextType['user']>(
    firebaseAuth.currentUser
  )

  useEffect(
    () =>
      onAuthStateChanged(
        firebaseAuth,
        (loggedInUser) => void setUser(loggedInUser)
      ),
    [setUser]
  )

  const value = useMemo<UserContextType>(
    () =>
      user !== null
        ? { user, isLoggedIn: true }
        : { user: null, isLoggedIn: false },
    [user]
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUser = (): UserContextType => useContext(UserContext)
