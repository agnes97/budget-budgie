// TODO: Fix following linting problems!
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import type { FC } from 'react'
import { useState } from 'react'

import type { DataContentOptions } from '../../../../services/budget/types'
import { ArticlesHeader } from '../ArticlesHeader'
import { ArticlesTotalFirstChild } from '../ArticlesTotal'
import type { PopUpData } from '../BudgetNotePopUp'
import { BudgetNotePopUp } from '../BudgetNotePopUp'
import './index.css'

interface IncomeProps {
  incomeData: any
}

export const Income: FC<IncomeProps> = ({ incomeData }) => {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false)
  const [popUpData, setPopUpData] = useState<PopUpData>()

  const handlePopUpClosing = () => void setIsPopUpVisible(!isPopUpVisible)

  const handlePopUp = (data: PopUpData): void => {
    setPopUpData(data)
    setIsPopUpVisible(!isPopUpVisible)
  }

  return (
    <article className={incomeData.class}>
      <ArticlesHeader title={incomeData.title} subtitle={incomeData.subtitle} />
      <div className="content">
        {incomeData.content.map((person: DataContentOptions) => (
          <div
            key={person.name}
            className="content-two-columns"
            onClick={() => void handlePopUp({
              emoji: person.emoji, item: person.name, note: person.note,
            })}
          >
            <div>
              <span className="emoji">{person.emoji}</span>
              <span className="name">{person.name}</span>
            </div>
            <span className="wage">{person.wage?.toLocaleString()}</span>
          </div>
        ))}
      </div>
      <ArticlesTotalFirstChild />

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
        className={incomeData.class}
        visibility={isPopUpVisible}
        onClose={handlePopUpClosing}
        emoji={popUpData?.emoji}
        item={popUpData?.item}
        note={popUpData?.note}
      />
    </article>
  )
}
