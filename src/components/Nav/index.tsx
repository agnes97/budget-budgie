/* eslint-disable no-warning-comments */
import type { FC, MouseEvent } from 'react'
import { useEffect, useState } from 'react'

import { Button } from 'components/Button'
import './index.css'
import { DropdownMenu } from 'components/DropdownMenu'
import { useUser } from 'contexts/User'
import { getBudgetIdsByUser } from 'services/budget'
import { signUser, signUserOut } from 'services/firebase/auth'


export const Nav: FC = () => {
  const { user, isLoggedIn } = useUser()
  const [usersBudgets, setUsersBudgets] = useState<string[]>()

  // USER SIGN UP / SIGN IN
  // eslint-disable-next-line consistent-return
  const handleOnClick = (event: MouseEvent) => {
    event.preventDefault()

    if (isLoggedIn) {
      return signUserOut()
    }

    // TODO: Solve following linting problem:
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    signUser()
  }

  useEffect(() => {
    const getBudgetByUser = async (): Promise<string[]> => {
      if (!user) {
        return ['You have no budgets yet. :(']
      }
      return await getBudgetIdsByUser(user.uid) ?? ['You have no budgets yet. :(']
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getBudgetByUser().then(budgetId => setUsersBudgets(budgetId))
  }, [user])

  // eslint-disable-next-line no-console
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
        lastItem={user ? '➕ NEW BUDGET ➕' : undefined}
      />
      <Button
        shape="rectangular"
        value={isLoggedIn ? <LogOut /> : 'LOG IN WITH GOOGLE'}
        onClick={handleOnClick}
      />
    </nav>
  )
}
