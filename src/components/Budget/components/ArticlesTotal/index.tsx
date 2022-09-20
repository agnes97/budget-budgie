import type { FC } from 'react'

import { useBudgetData } from 'contexts/Budget'
import { countCost, countMonthlyWage } from 'services/budget'

import { StyledArticleTotal } from './styled'

export const ArticlesTotalFirstChild: FC = () => {
  const { budgetData } = useBudgetData()

  const monthlyEarnings = countMonthlyWage(budgetData, 0)
  const yearlyEarning = countMonthlyWage(budgetData, 0) * 12
  const monthlyExpenses = countCost(budgetData, 1, 'cost') ?? 0
  const monthlySavings = monthlyEarnings - monthlyExpenses
  const yearlyExpenses = monthlyExpenses * 12
  const yearlySavings = yearlyEarning - monthlyExpenses * 12

  return (
    // DISPLAY TOTAL OF WAGES IN THE FIRST COLUMN
    <StyledArticleTotal>
      <div>
        <span className="title">MONTHLY:</span>
        <div className="numbers-container">
          <span className="number earnings">
            {monthlyEarnings.toLocaleString()}
          </span>
          <span className="number expenses">
            {monthlyExpenses.toLocaleString()}
          </span>
          <span className="number savings">
            {monthlySavings.toLocaleString()}
          </span>
        </div>
      </div>
      <div>
        <span className="title">YEARLY:</span>
        <span className="subtitle">(calculated as monthly * 12)</span>
        <div className="numbers-container">
          <span className="number earnings">
            {yearlyEarning.toLocaleString()}
          </span>
          <span className="number expenses">
            {yearlyExpenses.toLocaleString()}
          </span>
          <span className="number savings">
            {yearlySavings.toLocaleString()}
          </span>
        </div>
      </div>
    </StyledArticleTotal>
  )
}

export const ArticlesTotal: FC = () => {
  const { budgetData } = useBudgetData()

  return (
    // DISPLAY TOTAL COST OF MONTHLY NEEDS IN THE SECOND COLUMN
    <StyledArticleTotal>
      <span className="column-total">
        - {countCost(budgetData, 1, 'cost')?.toLocaleString()}
      </span>
    </StyledArticleTotal>
  )
}
