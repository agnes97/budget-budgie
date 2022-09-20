/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FC } from 'react'
import { useState } from 'react'

import { Button } from 'components/Button'
import { useUser } from 'contexts/User'

import { StyledArticleIncome } from './styled'

import type { DataContentOptions } from '../../../../services/budget/types'
import { AddOwnersPopUp } from '../AddOwnersPopUp'
import { ArticlesHeader } from '../ArticlesHeader'
import { ArticlesTotalFirstChild } from '../ArticlesTotal'
import type { PopUpData } from '../BudgetNotePopUp'
import { BudgetNotePopUp } from '../BudgetNotePopUp'
import {
  StyledAddItemToCategoryPopUpContainer,
  StyledContentTwoColumns,
} from '../ContentTwoColumns/styled'

interface IncomeProps {
  incomeData: any
}

export const Income: FC<IncomeProps> = ({ incomeData }) => {
  const [isBudgetNotePopUpVisible, setIsBudgetNotePopUpVisible] =
    useState(false)
  const [popUpData, setPopUpData] = useState<PopUpData>()
  const [isNewOwnerPopUpVisible, setIsNewOwnerPopUpVisible] = useState(false)

  const { user } = useUser()

  const content = incomeData.content

  // Budget Note PopUp
  const handleBudgetNotePopUpClosing = () =>
    void setIsBudgetNotePopUpVisible(!isBudgetNotePopUpVisible)

  const handleBudgetNotePopUp = (data: PopUpData): void => {
    setPopUpData(data)
    setIsBudgetNotePopUpVisible(!isBudgetNotePopUpVisible)
  }

  // New Owner PopUp
  const handleNewOwnerPopUpClosing = () =>
    void setIsNewOwnerPopUpVisible(!isNewOwnerPopUpVisible)

  return (
    <StyledArticleIncome className={incomeData.class}>
      <ArticlesHeader title={incomeData.title} subtitle={incomeData.subtitle} />

      <div className="content">
        {content.map((person: DataContentOptions, index: number) => (
          <StyledContentTwoColumns
            key={person.name}
            className="content-two-columns"
            onClick={() =>
              void handleBudgetNotePopUp({
                index,
                emoji: person.emoji,
                item: person.name,
                note: person.note,
                done: person.done
              })
            }
          >
            <div>
              <span className="emoji">{person.emoji}</span>
              <span className="name">{person.name}</span>
            </div>
            <span className="wage">
              {person.wage ? person.wage.toLocaleString() : 0}
            </span>
          </StyledContentTwoColumns>
        ))}

        {/* HIDDEN ADD OWNER POP-UP */}
        {user && (
          <StyledAddItemToCategoryPopUpContainer>
            {isNewOwnerPopUpVisible ? (
              <AddOwnersPopUp
                visibility={isNewOwnerPopUpVisible}
                categoryClass={incomeData.class}
                onClose={handleNewOwnerPopUpClosing}
              />
            ) : (
              <Button
                className="submit-button"
                shape="circular"
                onClick={() => void setIsNewOwnerPopUpVisible(true)}
              >
                +
              </Button>
            )}
          </StyledAddItemToCategoryPopUpContainer>
        )}
      </div>

      <ArticlesTotalFirstChild />

      {/* HIDDEN NOTE POP-UP */}
      <BudgetNotePopUp
        className={incomeData.class}
        visibility={isBudgetNotePopUpVisible}
        onClose={handleBudgetNotePopUpClosing}
        index={popUpData?.index}
        emoji={popUpData?.emoji}
        item={popUpData?.item}
        note={popUpData?.note}
        done={popUpData?.done}
      />
    </StyledArticleIncome>
  )
}
