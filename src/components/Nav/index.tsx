/* eslint-disable no-warning-comments */
import type { FC, MouseEvent } from 'react'
import { useEffect, useState } from 'react'

import { Button } from 'components/Button'
import './index.css'
import { DropdownMenu } from 'components/DropdownMenu'
import { useUser } from 'contexts/User'
import { getBudgetIdsByUserId } from 'services/budget'
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

    void signUser()
  }

  useEffect(() => {
    const getBudgetByUser = async (): Promise<string[]> => {
      if (!user) {
        return ['You have no budgets yet. :(']
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      return (
        await getBudgetIdsByUserId(user.uid) ?? [
          'You have no budgets yet. :(',
        ]
      )
    }

    void getBudgetByUser().then(budgetId => setUsersBudgets(budgetId))
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
      {/* TODO: Set active budget onClick! */}
      <DropdownMenu
        hidden={!user}
        value="MY BUDGETS"
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
