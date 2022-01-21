import React, { useState } from 'react'
import { Data, DataContentOptions } from '../../../../../public/data/types'
import BudgetDetailPopUp, { PopUpData } from '../BudgetDetailPopUp'
import './index.css'

type Props = {
    article: DataContentOptions[],
    column: Data["class"]
}

const ContentTwoColumns: React.FC<Props> = ({ article, column }) => {
  const [popUpVisibility, setPopUpVisibility] = useState(false)
  const [popUpData, setPopUpData] = useState<PopUpData>()

  const handlePopUpClosing = () => (setPopUpVisibility(!popUpVisibility))

  const handlePopUp = (data: PopUpData) => {
    setPopUpData(data)
    setPopUpVisibility(!popUpVisibility)
  }

  // const jsonEscape = (str: DataContentOptions["note"]) => (str ?? "").replace(/[\n]/g, '\\n')

  return (
    <>
      {article.map((item: DataContentOptions, index: number) => (
        <div
          key={index}
          title={item?.note}
          onClick={() => handlePopUp({emoji: item.emoji, item: item.item, note: item.note})}
          className={(item?.done === 1)
            ? "content-two-columns done"
            : "content-two-columns"}
        >
          {item?.cost
            ? <span className="cost">{item?.cost?.toLocaleString()}</span>
            : <span className="undefined-cost">???</span>}
          <div>
            <span className="emoji">{item?.emoji}</span>
            <span className={item?.note
              ? "item italic"
              : "item"}>
              {item?.item}
            </span>
          </div>
        </div>
      ))}

      {/* HIDDEN POP-UP */}
      <BudgetDetailPopUp
        className={column}
        visibility={popUpVisibility}
        onClose={handlePopUpClosing}
        emoji={popUpData?.emoji}
        item={popUpData?.item}
        note={popUpData?.note} 
      />
    </>
  )
}

export default ContentTwoColumns