/* eslint-disable no-warning-comments */
// TODO: Fix following linting problems!
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import type { FC } from 'react'
import { useState } from 'react'

import type { Data, DataContentOptions } from '../../../../services/budget/types'
import type { PopUpData } from '../BudgetDetailPopUp'
import { BudgetDetailPopUp } from '../BudgetDetailPopUp'
import './index.css'

type Props = {
  article: DataContentOptions[]
  column: Data['class']
}

export const ContentTwoColumns: FC<Props> = ({ article, column }) => {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false)
  const [popUpData, setPopUpData] = useState<PopUpData>()

  const handlePopUpClosing = () => setIsPopUpVisible(!isPopUpVisible)

  const handlePopUp = (data: PopUpData) => {
    setPopUpData(data)
    setIsPopUpVisible(!isPopUpVisible)
  }

  // const jsonEscape = (str: DataContentOptions["note"]) => (str ?? "").replace(/[\n]/g, '\\n')

  return (
    <>
      {article.map((item: DataContentOptions) => (
        <div
          key={item.name}
          title={item?.note}
          onClick={() => handlePopUp({ emoji: item.emoji, item: item.item, note: item.note })}
          className={item?.done === 1
            ? 'content-two-columns done'
            : 'content-two-columns'}
        >
          {item?.cost
            ? <span className="cost">{item?.cost?.toLocaleString()}</span>
            : <span className="undefined-cost">???</span>}
          <div>
            <span className="emoji">{item?.emoji}</span>
            <span
              className={item?.note
                ? 'item italic'
                : 'item'}
            >
              {item?.item}
            </span>
          </div>
        </div>
      ))}

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
      {/* HIDDEN POP-UP */}
      <BudgetDetailPopUp
        className={column}
        visibility={isPopUpVisible}
        onClose={handlePopUpClosing}
        emoji={popUpData?.emoji}
        item={popUpData?.item}
        note={popUpData?.note}
      />
    </>
  )
}
