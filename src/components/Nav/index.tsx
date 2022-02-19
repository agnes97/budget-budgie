import { FC, MouseEvent, useEffect, useState } from 'react'
import { Button } from 'components/Button'
import { signUser, signUserOut } from 'services/firebase/auth'
import './index.css'
import { useUser } from 'contexts/User'
import { getBudgetIdsByUser } from 'services/budget'
import { DropdownMenu } from 'components/DropdownMenu'


export const Nav: FC = () => {
    const {user, isLoggedIn} = useUser()
    const [usersBudgets, setUsersBudgets] = useState<string[]>()
    
    // USER SIGN UP / SIGN IN
    const handleOnClick = (event: MouseEvent) => {
        event.preventDefault()
        
        if (isLoggedIn) return signUserOut()
        
        signUser()
    }

    useEffect(() => {
        const getBudgetByUser = async (): Promise<string[]> => {
            if (!user) return ['You have no budgets yet. :('] 
            return (await getBudgetIdsByUser(user.uid)) ?? ['You have no budgets yet. :('] 
        }

        getBudgetByUser().then((budgetId) => setUsersBudgets(budgetId))
    }, [user])

    console.log(usersBudgets) 
    
    const LogOut: FC = () => <div>LOG OUT <span className='user-name'>{user?.displayName}</span></div>

    return (
        <nav className='header-nav'>
            {/* TODO: Create new budget onClick */}
            {/* TODO: Show active budget! */}
            {/* TODO: Set active budget onClick! */}
            <DropdownMenu 
                    hidden={!user}
                    value='MY BUDGETS'
                    menuItems={usersBudgets ?? []} 
                    lastItem={user ? '➕ NEW BUDGET ➕' : undefined}/>
            <Button type={'rectangular'} value={isLoggedIn ? <LogOut /> : 'LOG IN WITH GOOGLE'} onClick={handleOnClick} />
        </nav>
    )
}
