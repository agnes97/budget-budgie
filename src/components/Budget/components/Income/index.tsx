import { FC, useState } from 'react'
import { DataContentOptions } from '../../../../services/budget/types'
import { ArticlesHeader } from '../ArticlesHeader'
import { ArticlesTotalFirstChild } from '../ArticlesTotal'
import { BudgetDetailPopUp, PopUpData } from '../BudgetDetailPopUp'
import "./index.css"

type IncomeProps = {
    incomeData: any
}

export const Income: FC<IncomeProps> = ({ incomeData }) => {  
    const [popUpVisibility, setPopUpVisibility] = useState(false)
    const [popUpData, setPopUpData] = useState<PopUpData>()

    const handlePopUpClosing = () => (setPopUpVisibility(!popUpVisibility))

    const handlePopUp = (data: PopUpData) => {
        setPopUpData(data)
        setPopUpVisibility(!popUpVisibility)
    }

    return (
        <article className={incomeData.class}>
            <ArticlesHeader title={incomeData.title} subtitle={incomeData.subtitle} />
            <div className="content">
                {incomeData.content.map((person: DataContentOptions, index: number) => (
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
            <ArticlesTotalFirstChild />

            {/* HIDDEN POP-UP */}
            {/* TODO: Implement:
                const handleNoteEdit = async (newNote: string) => {
                const noteRef = doc(firestore, "budgets", "showcase")

                await updateDoc(noteRef, {
                    // TODO: Classname should not be undefined!
                    [`categories.${className}`]: [...orinal array without replaced element, replaced element with new note value]
                })
            }
            */}
            <BudgetDetailPopUp 
                    className={incomeData.class}
                    visibility={popUpVisibility} 
                    onClose={handlePopUpClosing} 
                    emoji={popUpData?.emoji} 
                    item={popUpData?.item} 
                    note={popUpData?.note}
            /> 
        </article>
    )
}
