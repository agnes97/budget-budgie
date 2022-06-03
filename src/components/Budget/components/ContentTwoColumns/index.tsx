// TODO: Fix following linting problems!
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import type { FC } from 'react'
import { useState } from 'react'

import type {
  Data,
  DataContentOptions,
} from '../../../../services/budget/types'
import { AddItemToCategory } from '../AddItemToCategory'
import type { PopUpData } from '../BudgetNotePopUp'
import { BudgetNotePopUp } from '../BudgetNotePopUp'

import './index.css'

interface Props {
  article: DataContentOptions[]
  column: Data['class']
}

export const ContentTwoColumns: FC<Props> = ({ article, column }) => {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false)
  const [popUpData, setPopUpData] = useState<PopUpData>()

  const handlePopUpClosing = () => void setIsPopUpVisible(!isPopUpVisible)

  const handlePopUp = (data: PopUpData): void => {
    setPopUpData(data)
    setIsPopUpVisible(!isPopUpVisible)
  }

  // const jsonEscape = (str: DataContentOptions["note"]) => (str ?? "").replace(/[\n]/g, '\\n')

  return (
    <>
      {article.map((item: DataContentOptions, index) => (
        <div
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
                void handlePopUp({
                  index,
                  emoji: item.emoji,
                  item: item.item,
                  note: item.note,
                })
              }
            >
              {item.item}
            </span>
          </div>
        </div>
      ))}

      <AddItemToCategory category={column} />

      {/* HIDDEN POP-UP */}
      <BudgetNotePopUp
        className={column}
        visibility={isPopUpVisible}
        onClose={handlePopUpClosing}
        index={popUpData?.index}
        emoji={popUpData?.emoji}
        item={popUpData?.item}
        note={popUpData?.note}
      />
    </>
  )
}
