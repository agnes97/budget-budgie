/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import type { FC } from 'react'
import { useState } from 'react'

// import { sortByEmoji, sortItemsBy } from 'services/budget'

import { Button } from 'components/Button'

import { StyledContentOneColumn } from './styled'

import type {
  Data,
  DataContentOptions,
} from '../../../../services/budget/types'
import { AddItemToCategoryPopUp } from '../AddItemToCategoryPopUp'
import type { PopUpData } from '../BudgetNotePopUp'
import { BudgetNotePopUp } from '../BudgetNotePopUp'
import { StyledAddItemToCategoryPopUpContainer } from '../ContentTwoColumns/styled'
// import { ButtonContainer } from '../ButtonContainer'

interface Props {
  article: DataContentOptions[]
  column: Data['class']
}

export const ContentOneColumn: FC<Props> = ({ article, column }) => {
  // const [sortedArticle, setSortedArticle] = useState(article)
  const [isBudgetNotePopUpVisible, setIsBudgetNotePopUpVisible] =
    useState(false)
  const [isNewItemPopUpVisible, setIsNewItemPopUpVisible] = useState(false)
  const [popUpData, setPopUpData] = useState<PopUpData>()

  // const handleSortItemsBy = (sortBy: keyof DataContentOptions) => () =>
  //   void setSortedArticle(sortItemsBy([...article], sortBy))

  // const handleSortItemsByEmoji = () => () =>
  //   void setSortedArticle(sortByEmoji([...article], '✈️'))

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
    <StyledContentOneColumn className="content-one-column">
      {article.map((item: DataContentOptions, index) => (
        <div
          key={item.item}
          title={item.note}
          className={`content-one-column-row ${item.done === 1 && 'done'}`}
          onClick={() =>
            void handleBudgetNotePopUp({
              index,
              emoji: item.emoji,
              item: item.item,
              note: item.note,
            })
          }
        >
          <span className="emoji">{item.emoji}</span>
          <span className={item.note ? 'item italic' : 'item'}>
            {item.item}
          </span>
        </div>
      ))}

      {/* <ButtonContainer
        title="SORT BY:"
        buttonsParameters={[
          { value: 'NAME', onClick: handleSortItemsBy('item') },
          { value: 'EMOJI', onClick: handleSortItemsBy('emoji') },
          { value: '✈️', onClick: handleSortItemsByEmoji() },
        ]}
      /> */}

      {/* HIDDEN POP-UP */}
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

      <BudgetNotePopUp
        className={column}
        visibility={isBudgetNotePopUpVisible}
        onClose={handleBudgetNotePopUpClosing}
        index={popUpData?.index}
        emoji={popUpData?.emoji}
        item={popUpData?.item}
        note={popUpData?.note}
      />
    </StyledContentOneColumn>
  )
}
