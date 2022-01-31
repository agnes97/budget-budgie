import { FC, useState } from 'react'
import { sortByEmoji, sortItemsBy } from 'services/budget'
import { Data, DataContentOptions } from '../../../../../public/data/types'
import BudgetDetailPopUp, { PopUpData } from '../BudgetDetailPopUp'
import ButtonContainer from '../ButtonContainer'
import './index.css'

type Props = {
    article: DataContentOptions[],
    column: Data["class"]
}

const ContentOneColumn: FC<Props> = ({ article, column }) => {
  const [sortedArticle, setSortedArticle] = useState(article)
  const [popUpVisibility, setPopUpVisibility] = useState(false)
  const [popUpData, setPopUpData] = useState<PopUpData>()

  const handleSortItemsBy = (sortBy: keyof DataContentOptions) => () =>
    setSortedArticle(sortItemsBy([...article], sortBy))

  const handleSortItemsByEmoji = () => () =>
    setSortedArticle(sortByEmoji([...article], "✈️"))

  const handlePopUpClosing = () => (setPopUpVisibility(!popUpVisibility))

  const handlePopUp = (data: PopUpData) => {
    setPopUpData(data)
    setPopUpVisibility(!popUpVisibility)
  }
  
  return (
    <div className="content-one-column">
      <div>
        {sortedArticle.map((item: DataContentOptions, index: number) => (
          <div 
            key={index} 
            title={item.note}
            className={`content-one-column-row ${(item?.done === 1) ? "done" : undefined}`}
            onClick={() => handlePopUp({emoji: item.emoji, item: item.item, note: item.note})}  
          >
            <span className="emoji">{item.emoji}</span>
            <span className={item.note
              ? "item italic"
              : "item"}>
              {item.item}
            </span>
          </div>
        ))}
      </div>
      <ButtonContainer 
        title="SORT BY:"
        buttonsParameters={[
        {value: "NAME", onClick: handleSortItemsBy('item')},
        {value: "EMOJI", onClick: handleSortItemsBy('emoji')},
        {value: "✈️", onClick: handleSortItemsByEmoji()}
      ]} />

      {/* HIDDEN POP-UP */}
      <BudgetDetailPopUp 
            className={column}
            visibility={popUpVisibility} 
            onClose={handlePopUpClosing} 
            emoji={popUpData?.emoji} 
            item={popUpData?.item} 
            note={popUpData?.note}
      /> 
    </div>
  )
}

export default ContentOneColumn