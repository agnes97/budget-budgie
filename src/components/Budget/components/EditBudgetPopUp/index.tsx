import type { FC } from 'react'

import { PopUp } from 'components/PopUp'
import { useBudgetData } from 'contexts/Budget'

import type { DataContentOptions } from '../../../../services/budget/types'

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

export const EditBudgetPopUp: FC<Props> = ({ visibility, onClose }) => {
  const { budgetInfo } = useBudgetData()

  return (
    <PopUp
      visibility={visibility}
      headerTitleText={`Do you want to edit "${budgetInfo.title}"?`}
      onClose={onClose}
    >
      {/* TODO: Add editing/updating budgetInfo form :) */}
      You will be able to edit budget title and description here, the
      functionality to do that is currently work in progress! Sorry for the
      inconvenience, please check this pop up later. :)
    </PopUp>
  )
}
