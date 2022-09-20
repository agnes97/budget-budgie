// TODO: Fix following linting problems!
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import type { FC } from 'react'
import { useState } from 'react'

import { Button } from 'components/Button'
import { useUser } from 'contexts/User'

import {
  StyledContentTwoColumns,
  StyledAddItemToCategoryPopUpContainer,
} from './styled'

import type {
  Data,
  DataContentOptions,
} from '../../../../services/budget/types'
import { AddItemToCategoryPopUp } from '../AddItemToCategoryPopUp'
import type { PopUpData } from '../BudgetNotePopUp'
import { BudgetNotePopUp } from '../BudgetNotePopUp'

interface Props {
  article: DataContentOptions[]
  column: Data['class']
}

export const ContentTwoColumns: FC<Props> = ({ article, column }) => {
  const [isBudgetNotePopUpVisible, setIsBudgetNotePopUpVisible] =
    useState(false)
  const [popUpData, setPopUpData] = useState<PopUpData>()
  const [isNewItemPopUpVisible, setIsNewItemPopUpVisible] = useState(false)

  const { user } = useUser()

  // Budget Note PopUp
  const handleBudgetNotePopUpClosing = () =>
    void setIsBudgetNotePopUpVisible(!isBudgetNotePopUpVisible)

  const handleBudgetNotePopUp = (data: PopUpData): void => {
    setPopUpData(data)
    setIsBudgetNotePopUpVisible(!isBudgetNotePopUpVisible)
  }

  // New Item PopUp
  const handleNewItemPopUpClosing = () =>
    void setIsNewItemPopUpVisible(!isNewItemPopUpVisible)

  return (
    <>
      {article.map((item: DataContentOptions, index) => (
        <StyledContentTwoColumns
          key={item.item}
          title={item.note}
          className={
            item.done === 1 ? 'content-two-columns done' : 'content-two-columns'
          }
        >
          {item.cost ? (
            <span className="cost">{item.cost.toLocaleString()}</span>
          ) : (
            <span className="undefined-cost">???</span>
          )}
          <div>
            <span className="emoji">{item.emoji}</span>
            <span
              className={item.note ? 'item italic' : 'item'}
              onClick={() =>
                void handleBudgetNotePopUp({
                  index,
                  emoji: item.emoji,
                  item: item.item,
                  note: item.note,
                  done: item.done,
                })
              }
            >
              {item.item}
            </span>
          </div>
        </StyledContentTwoColumns>
      ))}

      {/* HIDDEN POP-UP */}
      {user && (
        <StyledAddItemToCategoryPopUpContainer>
          {isNewItemPopUpVisible ? (
            <AddItemToCategoryPopUp
              visibility={isNewItemPopUpVisible}
              category={column}
              onClose={handleNewItemPopUpClosing}
            />
          ) : (
            <Button
              className="submit-button"
              shape="circular"
              onClick={() => void setIsNewItemPopUpVisible(true)}
            >
              +
            </Button>
          )}
        </StyledAddItemToCategoryPopUpContainer>
      )}

      {/* HIDDEN POP-UP */}
      <BudgetNotePopUp
        className={column}
        visibility={isBudgetNotePopUpVisible}
        onClose={handleBudgetNotePopUpClosing}
        index={popUpData?.index}
        emoji={popUpData?.emoji}
        item={popUpData?.item}
        note={popUpData?.note}
        done={popUpData?.done}
      />
    </>
  )
}
