import type { FC } from 'react'

import { Button } from 'components/Button'
import { PopUp } from 'components/PopUp'
import { useUser } from 'contexts/User'
import { createNewBudget } from 'services/budget'

import type { DataContentOptions } from '../../../../services/budget/types'

import './index.css'

export interface PopUpData {
  index?: number
  emoji?: DataContentOptions['emoji']
  item?: DataContentOptions['item']
  note?: DataContentOptions['note']
}

type Props = PopUpData & {
  onClose: () => void
  visibility: boolean
}

export const NewBudgetPopUp: FC<Props> = ({ visibility, onClose }) => {
  const { user } = useUser()

  const handleCreateNewBudget = async (): Promise<void> => {
    if (!user) {
      return
    }
    await createNewBudget(user.uid, 'newBudget')
  }

  return (
    <PopUp
      visibility={visibility}
      headerTitleText="Do you want to create new budget?"
      onClose={onClose}
    >
      <article>
        <Button onClick={handleCreateNewBudget}>yes, please</Button>
      </article>
    </PopUp>
  )
}
