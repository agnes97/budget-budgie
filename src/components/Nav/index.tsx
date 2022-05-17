/* eslint-disable no-warning-comments */
import type { FC, MouseEvent } from 'react'
import { useEffect, useState } from 'react'

import { Button } from 'components/Button'
import './index.css'
import { DropdownMenu } from 'components/DropdownMenu'
import { useBudgetData } from 'contexts/Budget'
import { useUser } from 'contexts/User'
import { getBudgetIdsByUserId } from 'services/budget'
import { signUser, signUserOut } from 'services/firebase/auth'

export const Nav: FC = () => {
  const { user, isLoggedIn } = useUser()
  const { setActiveBudget } = useBudgetData()
  const [usersBudgets, setUsersBudgets] = useState<string[]>()

  // USER SIGN UP / SIGN IN
  const handleOnClick = async (event: MouseEvent): Promise<void> => {
    event.preventDefault()

    if (isLoggedIn) {
      return await signUserOut()
    }

    return await signUser()
  }

  useEffect(() => {
    const getBudgetsByUserList = async (): Promise<string[]> => {
      if (!user) {
        return ['You have no budgets yet. :(']
      }

      return (
        await getBudgetIdsByUserId(user.uid) ?? [
          'You have no budgets yet. :(',
        ]
      )
    }

    void getBudgetsByUserList().then(budgetId => setUsersBudgets(budgetId))
  }, [user])

  const LogOut: FC = () => (
    <div>
      LOG OUT <span className="user-name">{user?.displayName}</span>
    </div>
  )

  return (
    <nav className="header-nav">
      {/* TODO: Create new budget onClick */}
      {/* TODO: Show active budget! */}
      <DropdownMenu
        hidden={!user}
        value="MY BUDGETS"
        menuItems={usersBudgets ?? []}
        menuItemsOnClick={budgetId => {
          void setActiveBudget(budgetId)
        }}
        lastItem={user ? '➕ NEW BUDGET ➕' : undefined}
        // eslint-disable-next-line no-console
        lastItemOnClick={lastItem => console.log(lastItem)}
      />
      <Button
        shape="rectangular"
        value={isLoggedIn ? <LogOut /> : 'LOG IN WITH GOOGLE'}
        onClick={handleOnClick}
      />
    </nav>
  )
}
