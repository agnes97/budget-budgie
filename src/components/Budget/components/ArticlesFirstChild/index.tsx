import { FC, useState } from 'react'
import { Data, DataContentOptions } from '../../../../services/budget/types'
import ArticlesHeader from '../ArticlesHeader'
import { ArticlesTotalFirstChild } from '../ArticlesTotal'
import BudgetDetailPopUp, { PopUpData } from '../BudgetDetailPopUp'
import "./index.css"

type Props = {
    budgetData: Data[]
    index: number
}

const ArticlesFirstChild: FC<Props> = ({ budgetData, index }) => {
    const articleData = budgetData[index]
    const column = budgetData[0].class
    
    const [popUpVisibility, setPopUpVisibility] = useState(false)
    const [popUpData, setPopUpData] = useState<PopUpData>()

    const handlePopUpClosing = () => (setPopUpVisibility(!popUpVisibility))

    const handlePopUp = (data: PopUpData) => {
        setPopUpData(data)
        setPopUpVisibility(!popUpVisibility)
    }

    return (
        <article className={articleData.class}>
            <ArticlesHeader title={articleData.title} subtitle={articleData.subtitle} />
            <div className="content">
                {articleData.content.map((person: DataContentOptions, index: number) => (
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a 
                        key={index} 
                        className="content-two-columns"
                        onClick={() => handlePopUp({emoji: person.emoji, item: person.name, note: person.note})}  
                    >
                        <div>
                            <span className="emoji">{person?.emoji}</span>
                            <span className="name">{person?.name}</span>
                        </div>
                        <span className="wage">{person?.wage?.toLocaleString()}</span>
                    </a>
                ))}
            </div>
            <ArticlesTotalFirstChild budgetData={budgetData} />

            {/* HIDDEN POP-UP */}
            <BudgetDetailPopUp 
                    className={column}
                    visibility={popUpVisibility} 
                    onClose={handlePopUpClosing} 
                    emoji={popUpData?.emoji} 
                    item={popUpData?.item} 
                    note={popUpData?.note}
            /> 
        </article>
    )
}

export default ArticlesFirstChild
