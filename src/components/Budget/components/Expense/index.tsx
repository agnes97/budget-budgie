import type { FC } from 'react'

import type { Data } from 'services/budget/types'

import { ArticlesHeader } from '../ArticlesHeader'
import { ArticlesTotal } from '../ArticlesTotal'
import { ContentOneColumn } from '../ContentOneColumn'
import { ContentTwoColumns } from '../ContentTwoColumns'
import './index.css'

interface ExpenseProps {
  expenseCategoryData: Data
}

export const Expense: FC<ExpenseProps> = ({ expenseCategoryData }) => {
  const content = expenseCategoryData.content

  return (
    <article className={expenseCategoryData.class}>
      <ArticlesHeader
        title={expenseCategoryData.title}
        subtitle={expenseCategoryData.subtitle}
      />
      <div className="content">
        {/* DISPLAY CONTENT IN ONE OR TWO COLUMNS */}
        {expenseCategoryData.class === 'goals' ? (
          <ContentOneColumn
            article={content}
            column={expenseCategoryData.class}
          />
        ) : (
          <ContentTwoColumns
            article={content}
            column={expenseCategoryData.class}
          />
        )}
      </div>
      {expenseCategoryData.class === 'need-month' && <ArticlesTotal />}
    </article>
  )
}
