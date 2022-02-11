import { FC } from 'react'
import { Data } from '../../../../services/budget/types'
import ArticlesHeader from '../ArticlesHeader'
import { ArticlesTotal } from '../ArticlesTotal'
import ContentOneColumn from '../ContentOneColumn'
import ContentTwoColumns from '../ContentTwoColumns'
import "./index.css"

type Props = {
    budgetData: Data[]
    index: number
}

const Articles: FC<Props> = ({ budgetData, index }) => {
    const articlesData = budgetData[index]

    return (
        <article key={index} className={articlesData.class}>
            <ArticlesHeader title={articlesData.title} subtitle={articlesData.subtitle} />
            <div className="content">
                {/* DISPLAY CONTENT IN ONE OR TWO COLUMNS */}
                {(articlesData.class === "goals") 
                    ? <ContentOneColumn article={articlesData.content} column={articlesData.class}/>
                    : <ContentTwoColumns article={articlesData.content} column={articlesData.class} />
                }
            </div>
            {(articlesData.class === "need-month")
            ? <ArticlesTotal budgetData={budgetData} />
            : null}
        </article>
    )
}

export default Articles
