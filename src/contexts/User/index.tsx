import type { User } from 'firebase/auth'
import { onAuthStateChanged } from 'firebase/auth'
import type { FC } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

import { firebaseAuth } from 'services/firebase'

export type UserContextType = {
  user: User
  isLoggedIn: true
} | {
  user: null
  isLoggedIn: false
}

const UserContext = createContext<UserContextType>({
  user: null,
  isLoggedIn: false,
})

export const UserProvider: FC = ({ children }) => {
  const [user, setUser] = useState<UserContextType['user']>(firebaseAuth.currentUser)

  useEffect(() => onAuthStateChanged(firebaseAuth, user => setUser(user)), [setUser])

  return (
    <UserContext.Provider
      // eslint-disable-next-line no-warning-comments
      // TODO: Fix the following linting problem:
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={user !== null ? { user, isLoggedIn: true } : { user: null, isLoggedIn: false }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = (): UserContextType => useContext(UserContext)
