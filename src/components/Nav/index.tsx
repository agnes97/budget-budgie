import type { FC } from 'react'
import { useEffect, useState } from 'react'

import { NewBudgetPopUp } from 'components/Budget/components/NewBudgetPopUp'
import { Button } from 'components/Button'
import { DropdownMenu } from 'components/DropdownMenu'
import { useBudgetData } from 'contexts/Budget'
import { useUser } from 'contexts/User'
import { getBudgetsByUserId } from 'services/budget'
import type { Budget } from 'services/budget/types'
import { signUser, signUserOut } from 'services/firebase/auth'

import { StyledNav } from './styled'

export const Nav: FC = () => {
  const { user, isLoggedIn } = useUser()
  const { setActiveBudget } = useBudgetData()
  const [usersBudgets, setUsersBudgets] = useState<Budget[]>([])
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

    // TODO: Fix loading of user based on profile!
    await signUser().then(() => void window.location.reload())
  }

  useEffect(() => {
    const getBudgetsByUserList = async (): Promise<Budget[]> => {
      if (!user) {
        return []
      }

      return await getBudgetsByUserId(user.uid)
    }

    void getBudgetsByUserList().then((budgets) => void setUsersBudgets(budgets))
  }, [user])

  const LogOut: FC = () => (
    <div>
      LOG OUT <span className="user-name">{user?.displayName}</span>
    </div>
  )

  return (
    <StyledNav className="header-nav">
      {/* TODO: Show active budget! */}
      <DropdownMenu
        value="MY BUDGETS"
        menuItems={usersBudgets}
        menuItemsOnClick={(budgetId) => {
          void setActiveBudget(budgetId)
        }}
        emptyMessage="You have no budgets yet. :("
        lastItem="➕ NEW BUDGET ➕"
        lastItemOnClick={handlePopUp}
        hidden={!user}
      />
      <Button shape="rectangular" onClick={handleOnClick}>
        {isLoggedIn ? <LogOut /> : 'LOG IN WITH GOOGLE'}
      </Button>
      <NewBudgetPopUp
        visibility={isPopUpVisible}
        onClose={handlePopUpClosing}
      />
    </StyledNav>
  )
}
