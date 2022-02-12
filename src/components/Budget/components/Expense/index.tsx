import { FC } from 'react'
import { Data } from 'services/budget/types'
import { ArticlesHeader } from '../ArticlesHeader'
import { ArticlesTotal } from '../ArticlesTotal'
import { ContentOneColumn } from '../ContentOneColumn'
import { ContentTwoColumns } from '../ContentTwoColumns'
import "./index.css"

type ExpenseProps = {
    expenseCategoryData: Data
}

export const Expense: FC<ExpenseProps> = ({ expenseCategoryData }) => (
    <article className={expenseCategoryData.class}>
        <ArticlesHeader title={expenseCategoryData.title} subtitle={expenseCategoryData.subtitle} />
        <div className="content">
            {/* DISPLAY CONTENT IN ONE OR TWO COLUMNS */}
            {(expenseCategoryData.class === "goals")
                ? <ContentOneColumn article={expenseCategoryData.content} column={expenseCategoryData.class} />
                : <ContentTwoColumns article={expenseCategoryData.content} column={expenseCategoryData.class} />}
        </div>
        { (expenseCategoryData.class === "need-month") && <ArticlesTotal /> }
    </article>
)