import { onAuthStateChanged, User } from 'firebase/auth'
import { createContext, FC, useContext, useEffect, useState } from 'react'
import { firebaseAuth } from 'services/firebase'

type UserContextType = {
    user: User | null,
    isLoggedIn: boolean,
}

const UserContext = createContext<UserContextType>({
	user: null,
	isLoggedIn: false,
})

export const UserProvider: FC = ({ children }) => {
    const [user, setUser] = useState<UserContextType['user']>(firebaseAuth.currentUser)
    
    useEffect(() => onAuthStateChanged(firebaseAuth, (user) => setUser(user)), [setUser])

    return (
        <UserContext.Provider
            value={{
                user,
                isLoggedIn: user !== null,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export const useUser = (): UserContextType => useContext(UserContext)
