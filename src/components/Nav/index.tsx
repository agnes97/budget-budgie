import type { FC } from 'react'
import { useEffect, useState } from 'react'

import { NewBudgetPopUp } from 'components/Budget/components/NewBudgetPopUp'
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
  const [isPopUpVisible, setIsPopUpVisible] = useState(false)

  const handlePopUpClosing = (): void => void setIsPopUpVisible(!isPopUpVisible)

  const handlePopUp = (): void => {
    setIsPopUpVisible(!isPopUpVisible)
  }

  // USER SIGN UP / SIGN IN
  const handleOnClick = async (
    onClickEvent: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    onClickEvent.preventDefault()

    if (isLoggedIn) {
      return void (await signUserOut())
    }

    return void (await signUser())
  }

  useEffect(() => {
    const getBudgetsByUserList = async (): Promise<string[]> => {
      if (!user) {
        return ['You have no budgets yet. :(']
      }

      return await getBudgetIdsByUserId(user.uid).then((budgets: string[]) =>
        budgets.length > 0 ? budgets : ['You have no budgets yet. :(']
      )
    }

    void getBudgetsByUserList().then(
      (budgetId) => void setUsersBudgets(budgetId)
    )
  }, [user])

  const LogOut: FC = () => (
    <div>
      LOG OUT <span className="user-name">{user?.displayName}</span>
    </div>
  )

  return (
    <nav className="header-nav">
      {/* TODO: Show active budget! */}
      <DropdownMenu
        hidden={!user}
        value="MY BUDGETS"
        menuItems={usersBudgets ?? []}
        menuItemsOnClick={(budgetId) => {
          void setActiveBudget(budgetId)
        }}
        lastItem="➕ NEW BUDGET ➕"
        lastItemOnClick={handlePopUp}
      />
      <Button
        shape="rectangular"
        value={isLoggedIn ? <LogOut /> : 'LOG IN WITH GOOGLE'}
        onClick={handleOnClick}
      />
      <NewBudgetPopUp
        visibility={isPopUpVisible}
        onClose={handlePopUpClosing}
      />
    </nav>
  )
}
