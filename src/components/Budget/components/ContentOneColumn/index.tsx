// TODO: Fix following linting problems!
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import type { FC } from 'react'
import { useState } from 'react'

import { sortByEmoji, sortItemsBy } from 'services/budget'

import { StyledContentOneColumn } from './styled'

import type {
  Data,
  DataContentOptions,
} from '../../../../services/budget/types'
import type { PopUpData } from '../BudgetNotePopUp'
import { BudgetNotePopUp } from '../BudgetNotePopUp'
import { ButtonContainer } from '../ButtonContainer'

interface Props {
  article: DataContentOptions[]
  column: Data['class']
}

export const ContentOneColumn: FC<Props> = ({ article, column }) => {
  const [sortedArticle, setSortedArticle] = useState(article)
  const [isPopUpVisible, setIsPopUpVisible] = useState(false)
  const [popUpData, setPopUpData] = useState<PopUpData>()

  const handleSortItemsBy = (sortBy: keyof DataContentOptions) => () =>
    void setSortedArticle(sortItemsBy([...article], sortBy))

  const handleSortItemsByEmoji = () => () =>
    void setSortedArticle(sortByEmoji([...article], '✈️'))

  const handlePopUpClosing = () => void setIsPopUpVisible(!isPopUpVisible)

  const handlePopUp = (data: PopUpData): void => {
    setPopUpData(data)
    setIsPopUpVisible(!isPopUpVisible)
  }

  return (
    <StyledContentOneColumn className="content-one-column">
      <div>
        {sortedArticle.map((item: DataContentOptions) => (
          <div
            key={item.item}
            title={item.note}
            className={`content-one-column-row ${item.done === 1 && 'done'}`}
            onClick={() =>
              void handlePopUp({
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
      </div>
      <ButtonContainer
        title="SORT BY:"
        buttonsParameters={[
          { value: 'NAME', onClick: handleSortItemsBy('item') },
          { value: 'EMOJI', onClick: handleSortItemsBy('emoji') },
          { value: '✈️', onClick: handleSortItemsByEmoji() },
        ]}
      />

      {/* HIDDEN POP-UP */}
      {/* TODO: Implement:
        const handleNoteEdit = async (newNote: string) => {
          const noteRef = doc(firestore, "budgets", "showcase")

          await updateDoc(noteRef, {
              // TODO: Classname should not be undefined!
              [`categories.${className}`]:
              [...orinal array without replaced element, replaced element with new note value]
          })
      }
      */}
      <BudgetNotePopUp
        className={column}
        visibility={isPopUpVisible}
        onClose={handlePopUpClosing}
        emoji={popUpData?.emoji}
        item={popUpData?.item}
        note={popUpData?.note}
      />
    </StyledContentOneColumn>
  )
}
